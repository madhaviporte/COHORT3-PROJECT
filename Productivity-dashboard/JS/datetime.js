/**
 * DateTime.js
 * Manages the live clocks, greets users based on system time, and compiles calendar layouts.
 */
const DateTimeModule = {
  currentTimePeriod: '', // morning, afternoon, evening, night

  init() {
    this.updateClock();
    // Start interval
    setInterval(() => this.updateClock(), 1000);
    
    // Draw monthly calendar grid once on init
    this.renderCalendar();
  },

  updateClock() {
    const now = new Date();
    
    // 1. Update Header Clock (HH:MM:SS format)
    const headerClock = document.getElementById('header-clock');
    if (headerClock) {
      headerClock.textContent = now.toLocaleTimeString([], { hour12: false });
    }

    // 2. Update Full Screen time view digital clock
    const fullClock = document.getElementById('datetime-full-clock');
    if (fullClock) {
      fullClock.textContent = now.toLocaleTimeString([], { hour12: false });
    }

    // 3. Update Full date text
    const fullDateText = document.getElementById('datetime-full-date');
    if (fullDateText) {
      fullDateText.textContent = now.toLocaleDateString([], { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }

    // 4. Update Dashboard Capsule
    const capsuleDay = document.getElementById('capsule-day');
    const capsuleDate = document.getElementById('capsule-date');
    if (capsuleDay) {
      capsuleDay.textContent = now.toLocaleDateString([], { weekday: 'long' });
    }
    if (capsuleDate) {
      capsuleDate.textContent = now.toLocaleDateString([], { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }

    // 5. Update Greetings based on time periods
    this.updateGreetings(now);
  },

  updateGreetings(dateObj) {
    const hours = dateObj.getHours();
    let newPeriod = 'night';
    let greetingText = 'Good Night';
    let subtitleText = 'Rest well and recharge for tomorrow.';

    if (hours >= 5 && hours < 12) {
      newPeriod = 'morning';
      greetingText = 'Good Morning';
      subtitleText = 'Seize the day and unlock your potential.';
    } else if (hours >= 12 && hours < 17) {
      newPeriod = 'afternoon';
      greetingText = 'Good Afternoon';
      subtitleText = 'Keep up the momentum. You are doing great!';
    } else if (hours >= 17 && hours < 20) {
      newPeriod = 'evening';
      greetingText = 'Good Evening';
      subtitleText = 'Reflect on your progress and unwind.';
    }

    // Update greeting headers
    const greetingEl = document.getElementById('dashboard-greeting');
    const subtitleEl = document.getElementById('dashboard-subtitle');
    if (greetingEl) {
      greetingEl.innerHTML = `${greetingText}, <span class="user-greeting-name" style="color: var(--primary);">Achiever</span>`;
    }
    if (subtitleEl) {
      subtitleEl.textContent = subtitleText;
    }

    // If period changed, notify background module to transition styles
    if (newPeriod !== this.currentTimePeriod) {
      this.currentTimePeriod = newPeriod;
      document.body.setAttribute('data-background', newPeriod);
      if (window.BackgroundModule) {
        window.BackgroundModule.transitionBackground(newPeriod);
      }
    }
  },

  renderCalendar() {
    const calendarMonthHeader = document.getElementById('calendar-header-month');
    const calendarGrid = document.getElementById('calendar-numbers-grid');
    if (!calendarGrid || !calendarMonthHeader) return;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const todayDate = now.getDate();

    // Set month title
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    calendarMonthHeader.textContent = `${months[currentMonth]} ${currentYear}`;

    // Clear calendar grid
    calendarGrid.innerHTML = '';

    // First day of current month (0 = Sun, 1 = Mon...)
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    
    // Total days in current month
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Total days in previous month (for leading blank padding)
    const prevTotalDays = new Date(currentYear, currentMonth, 0).getDate();

    // 1. Draw previous month's final dates (as muted gray blocks)
    for (let i = firstDayIndex; i > 0; i--) {
      const cell = document.createElement('div');
      cell.className = 'calendar-day prev-month-day';
      cell.textContent = prevTotalDays - i + 1;
      calendarGrid.appendChild(cell);
    }

    // 2. Draw current month's active dates
    for (let day = 1; day <= totalDays; day++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-day';
      if (day === todayDate) {
        cell.className += ' today-highlight';
      }
      cell.textContent = day;
      calendarGrid.appendChild(cell);
    }

    // 3. Draw next month's starting dates to pad the grid grid to full rows
    const totalRendered = firstDayIndex + totalDays;
    const remainingSlots = (totalRendered % 7 === 0) ? 0 : 7 - (totalRendered % 7);
    for (let day = 1; day <= remainingSlots; day++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-day next-month-day';
      cell.textContent = day;
      calendarGrid.appendChild(cell);
    }
  }
};
window.DateTimeModule = DateTimeModule;
