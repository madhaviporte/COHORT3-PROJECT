/**
 * Theme.js
 * Controls Light and Dark display mode variables.
 * Resolves settings immediately upon execution to prevent rendering white flash under dark themes.
 */
(function() {
  const THEME_KEY = 'aeroflow_theme';
  
  // Instantly read preference prior to DOM rendering resolution
  const savedTheme = localStorage.getItem(THEME_KEY);
  let activeTheme = 'light';

  if (savedTheme) {
    activeTheme = JSON.parse(savedTheme);
  } else {
    // If no storage selection, consult media queries for host os preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    activeTheme = prefersDark ? 'dark' : 'light';
  }

  // Bind attribute immediately to root html element
  document.documentElement.setAttribute('data-theme', activeTheme);

  // Expose global Theme controller
  window.ThemeModule = {
    current: activeTheme,

    init() {
      const toggleBtn = document.getElementById('theme-toggle');
      if (toggleBtn) {
        this.updateToggleButtonIcon(toggleBtn, this.current);
        toggleBtn.addEventListener('click', () => this.toggleTheme(toggleBtn));
      }
    },

    toggleTheme(toggleBtn) {
      const nextTheme = this.current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextTheme);
      this.current = nextTheme;
      
      if (window.Storage) {
        window.Storage.save(THEME_KEY, nextTheme);
      } else {
        localStorage.setItem(THEME_KEY, JSON.stringify(nextTheme));
      }
      
      this.updateToggleButtonIcon(toggleBtn, nextTheme);
      
      if (window.showToast) {
        window.showToast(`Switched to ${nextTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}`, 'info');
      }
    },

    updateToggleButtonIcon(btn, theme) {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-sun';
          btn.title = 'Switch to Light Mode';
        } else {
          icon.className = 'fa-solid fa-moon';
          btn.title = 'Switch to Dark Mode';
        }
      }
    }
  };
})();
