/**
 * Weather.js
 * Always attempts live browser Geolocation first.
 * Shows descriptive loading messages ("Detecting your current location...", "Loading weather...").
 * Provides Retry + Manual City Search fallback when permission is denied.
 * Uses Open-Meteo Forecast + Nominatim reverse geocoding. No hardcoded city.
 */
const WeatherModule = {
  WEATHER_STORAGE_KEY: 'aeroflow_weather_data',
  geolocationAttempted: false, // track if we already tried on boot

  init() {
    const cityForm      = document.getElementById('weather-city-form');
    const gpsBtn        = document.getElementById('btn-weather-gps');
    const retryBtn      = document.getElementById('btn-weather-retry');
    const headerWeather = document.getElementById('header-weather');

    if (cityForm) {
      cityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cityInput = document.getElementById('weather-city-input');
        if (cityInput && cityInput.value.trim()) {
          this.searchCity(cityInput.value.trim());
        }
      });
    }

    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => this.requestGeolocation(true));
    }

    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.requestGeolocation(true));
    }

    if (headerWeather) {
      headerWeather.addEventListener('click', () => {
        if (window.NavigationModule) window.NavigationModule.navigateTo('sec-weather');
      });
    }

    // Always try live location on boot — never use a cached/hardcoded city as first attempt
    this.requestGeolocation(false);
  },

  /**
   * Primary entry point. Always attempts real GPS first.
   * @param {boolean} isUserTriggered - true when the user explicitly clicked "Use Location" or "Retry"
   */
  requestGeolocation(isUserTriggered = false) {
    this.showState('locating'); // "Detecting your current location..."

    if (!navigator.geolocation) {
      this.showState('error', 'Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => this.onGeolocationSuccess(position),
      (error)    => this.onGeolocationError(error, isUserTriggered),
      { timeout: 10000, maximumAge: 300000 } // 5-min cache — OK for accuracy
    );
  },

  onGeolocationSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    this.showState('loading'); // "Loading weather..."
    this.showToastMsg('Location detected. Fetching weather...', 'success');

    // Reverse geocode to get a human-readable city name
    this.reverseGeocode(lat, lon, (cityName) => {
      this.fetchWeather(lat, lon, cityName);
    });
  },

  onGeolocationError(error, isUserTriggered) {
    console.warn('Geolocation error code:', error.code, error.message);

    let message = 'Unable to detect your location.';
    if (error.code === 1) {
      message = 'Location permission denied. Please enable it in your browser settings.';
    } else if (error.code === 2) {
      message = 'Location unavailable. Check your device\'s location services.';
    } else if (error.code === 3) {
      message = 'Location request timed out. Please try again.';
    }

    this.showState('error', message);
    if (isUserTriggered) {
      this.showToastMsg(message, 'warning');
    }
  },

  reverseGeocode(lat, lon, callback) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const addr = data.address || {};
        // Prefer most specific available: city → town → village → suburb → county
        const cityName = addr.city || addr.town || addr.village || addr.suburb || addr.county || 'Your Location';
        callback(cityName);
      })
      .catch(err => {
        console.warn('Reverse geocode failed:', err);
        callback('Your Location');
      });
  },

  searchCity(cityName) {
    this.showState('loading');
    this.showToastMsg('Searching for city...', 'info');

    const query = encodeURIComponent(cityName.trim());
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const r = data.results[0];
          const label = r.admin1 ? `${r.name}, ${r.admin1}` : `${r.name}, ${(r.country_code || '').toUpperCase()}`;
          this.fetchWeather(r.latitude, r.longitude, label);
          this.showToastMsg(`Showing weather for ${r.name}`, 'success');
          const inp = document.getElementById('weather-city-input');
          if (inp) inp.value = '';
        } else {
          this.showToastMsg('City not found. Check the spelling.', 'danger');
          this.showState('error', 'City not found. Try a different spelling.');
        }
      })
      .catch(err => {
        console.error('Geocoding error:', err);
        this.showToastMsg('Could not reach search servers.', 'danger');
        this.showState('error', 'Network error. Please check your connection.');
      });
  },

  fetchWeather(lat, lon, cityName) {
    this.showState('loading');

    const url = `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
      `&daily=sunrise,sunset&timezone=auto`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => this.renderWeatherData(data, cityName))
      .catch(err => {
        console.error('Weather fetch error:', err);
        this.showState('error', 'Unable to load weather data. Check your connection.');
        this.showToastMsg('Weather data unavailable.', 'danger');
      });
  },

  renderWeatherData(data, cityName) {
    const current = data.current;
    if (!current) {
      this.showState('error', 'Received invalid weather data.');
      return;
    }

    const temp      = Math.round(current.temperature_2m);
    const feelsLike = Math.round(current.apparent_temperature);
    const humidity  = current.relative_humidity_2m;
    const windSpeed = Math.round(current.wind_speed_10m);
    const interpret = this.decodeWMO(current.weather_code);

    // Parse sunrise/sunset
    let sunriseStr = '--';
    let sunsetStr  = '--';
    if (data.daily?.sunrise?.[0]) {
      sunriseStr = new Date(data.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (data.daily?.sunset?.[0]) {
      sunsetStr = new Date(data.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // ── Dashboard metric card ───────────────────────────────────────────────
    const dCity = document.getElementById('metric-weather-city');
    const dTemp = document.getElementById('metric-weather-temp');
    const dCond = document.getElementById('metric-weather-condition');
    const dIcon = document.getElementById('metric-weather-icon');
    const shortCity = cityName.split(',')[0];

    if (dCity) dCity.textContent = shortCity;
    if (dTemp) dTemp.textContent = `${temp}°C`;
    if (dCond) dCond.textContent = interpret.desc;
    if (dIcon) dIcon.innerHTML = `<i class="${interpret.icon}"></i>`;

    // ── Navigation card badge ───────────────────────────────────────────────
    const badge = document.getElementById('badge-weather-summary');
    if (badge) {
      badge.textContent = `${temp}°C · ${interpret.desc}`;
      badge.style.background = 'rgba(245, 158, 11, 0.15)';
      badge.style.color = 'var(--warning)';
    }

    // ── Header mini summary ─────────────────────────────────────────────────
    const headerWeather = document.getElementById('header-weather');
    if (headerWeather) {
      headerWeather.innerHTML = `<i class="${interpret.icon}"></i><span>${shortCity}: ${temp}°C</span>`;
    }

    // ── Full Weather section ────────────────────────────────────────────────
    const el = (id) => document.getElementById(id);
    if (el('weather-show-city'))      el('weather-show-city').textContent      = cityName;
    if (el('weather-show-temp'))      el('weather-show-temp').textContent      = `${temp}°C`;
    if (el('weather-show-icon'))      el('weather-show-icon').innerHTML        = `<i class="${interpret.icon}"></i>`;
    if (el('weather-show-condition')) el('weather-show-condition').textContent = interpret.desc;
    if (el('weather-show-feels'))     el('weather-show-feels').textContent     = `Feels like ${feelsLike}°C`;
    if (el('weather-show-humidity'))  el('weather-show-humidity').textContent  = `${humidity}%`;
    if (el('weather-show-wind'))      el('weather-show-wind').textContent      = `${windSpeed} km/h`;
    if (el('weather-show-sunrise'))   el('weather-show-sunrise').textContent   = sunriseStr;
    if (el('weather-show-sunset'))    el('weather-show-sunset').textContent    = sunsetStr;

    this.showState('data');
    this.showToastMsg(`Weather loaded for ${shortCity}`, 'info');
  },

  /**
   * Controls which weather panel state is visible.
   * States: 'locating' | 'loading' | 'data' | 'error'
   */
  showState(state, errorMessage = '') {
    const locatingEl = document.getElementById('weather-state-locating');
    const loadingEl  = document.getElementById('weather-state-loading');
    const dataEl     = document.getElementById('weather-real-data');
    const errorEl    = document.getElementById('weather-state-error');
    const errorMsgEl = document.getElementById('weather-error-message');

    [locatingEl, loadingEl, dataEl, errorEl].forEach(el => {
      if (el) el.style.display = 'none';
    });

    switch (state) {
      case 'locating':
        if (locatingEl) locatingEl.style.display = 'flex';
        break;
      case 'loading':
        if (loadingEl) loadingEl.style.display = 'flex';
        break;
      case 'data':
        if (dataEl) dataEl.style.display = 'grid';
        break;
      case 'error':
        if (errorEl) errorEl.style.display = 'flex';
        if (errorMsgEl && errorMessage) errorMsgEl.textContent = errorMessage;
        break;
    }
  },

  decodeWMO(code) {
    const map = {
      0:  { desc: 'Clear Sky',          icon: 'fa-solid fa-sun' },
      1:  { desc: 'Mainly Clear',        icon: 'fa-solid fa-cloud-sun' },
      2:  { desc: 'Partly Cloudy',       icon: 'fa-solid fa-cloud' },
      3:  { desc: 'Overcast',            icon: 'fa-solid fa-cloud-meatball' },
      45: { desc: 'Foggy',               icon: 'fa-solid fa-smog' },
      48: { desc: 'Depositing Rime Fog', icon: 'fa-solid fa-smog' },
      51: { desc: 'Light Drizzle',       icon: 'fa-solid fa-cloud-rain' },
      53: { desc: 'Moderate Drizzle',    icon: 'fa-solid fa-cloud-rain' },
      55: { desc: 'Heavy Drizzle',       icon: 'fa-solid fa-cloud-showers-heavy' },
      61: { desc: 'Slight Rain',         icon: 'fa-solid fa-cloud-rain' },
      63: { desc: 'Moderate Rain',       icon: 'fa-solid fa-cloud-rain' },
      65: { desc: 'Heavy Rain',          icon: 'fa-solid fa-cloud-showers-heavy' },
      71: { desc: 'Light Snowfall',      icon: 'fa-solid fa-snowflake' },
      73: { desc: 'Moderate Snowfall',   icon: 'fa-solid fa-snowflake' },
      75: { desc: 'Heavy Snowfall',      icon: 'fa-solid fa-snowflake' },
      80: { desc: 'Light Showers',       icon: 'fa-solid fa-cloud-showers-water' },
      81: { desc: 'Moderate Showers',    icon: 'fa-solid fa-cloud-showers-heavy' },
      82: { desc: 'Violent Showers',     icon: 'fa-solid fa-cloud-showers-heavy' },
      95: { desc: 'Thunderstorm',        icon: 'fa-solid fa-cloud-bolt' },
      96: { desc: 'Thunderstorm w/ Hail',icon: 'fa-solid fa-cloud-bolt' },
      99: { desc: 'Heavy Thunderstorm',  icon: 'fa-solid fa-cloud-bolt' },
    };
    return map[code] || { desc: 'Unknown', icon: 'fa-solid fa-question' };
  },

  showToastMsg(msg, type) {
    if (window.showToast) window.showToast(msg, type);
  }
};
window.WeatherModule = WeatherModule;
