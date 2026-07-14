/**
 * Script.js
 * Application bootstrap file. Triggers sub-module bindings, sets up global hotkeys,
 * and maintains the Toast notification popups framework.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Core Toast Notification Engine
  window.showToast = function(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Build markup
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Choose icon
    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'warning') iconClass = 'fa-solid fa-circle-exclamation';
    if (type === 'danger') iconClass = 'fa-solid fa-circle-xmark';

    toast.innerHTML = `
      <span class="toast-icon"><i class="${iconClass}"></i></span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" title="Dismiss"><i class="fa-solid fa-xmark"></i></button>
    `;

    // Append element
    container.appendChild(toast);

    // Click to dismiss
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      dismissToast(toast);
    });

    // Auto dismiss after 4 seconds
    const timeoutId = setTimeout(() => {
      dismissToast(toast);
    }, 4000);

    function dismissToast(element) {
      clearTimeout(timeoutId);
      element.classList.add('toast-exit');
      element.addEventListener('animationend', () => {
        element.remove();
      });
    }
  };

  // 2. Initialize Sub Modules sequentially
  try {
    // Basic setups
    if (window.ThemeModule) window.ThemeModule.init();
    if (window.BackgroundModule) window.BackgroundModule.init();
    if (window.DateTimeModule) window.DateTimeModule.init();
    if (window.NavigationModule) window.NavigationModule.init();

    // Features
    if (window.TodoModule) window.TodoModule.init();
    if (window.PlannerModule) window.PlannerModule.init();
    if (window.GoalsModule) window.GoalsModule.init();
    if (window.PomodoroModule) window.PomodoroModule.init();
    if (window.WeatherModule) window.WeatherModule.init();
    if (window.QuotesModule) window.QuotesModule.init();

    // Trigger initial stats refresh on modules
    setTimeout(() => {
      refreshAllMetrics();
    }, 200);

  } catch (error) {
    console.error("Critical error during AeroFlow initialization:", error);
    if (window.showToast) {
      window.showToast("System error during initialization. Please reload.", "danger");
    }
  }

  // 3. Register Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Check modifier (Alt key)
    if (e.altKey) {
      const key = e.key.toLowerCase();
      
      switch (key) {
        case 't': // Alt + T -> Focus Todo Manager
          e.preventDefault();
          navigateToSection('sec-todo');
          focusElement('todo-input');
          break;
        case 'p': // Alt + P -> Focus Planner Schedule
          e.preventDefault();
          navigateToSection('sec-planner');
          break;
        case 'g': // Alt + G -> Focus Goals Tracker
          e.preventDefault();
          navigateToSection('sec-goals');
          focusElement('goal-input');
          break;
        case 'c': // Alt + C -> Focus Pomodoro Clock
          e.preventDefault();
          navigateToSection('sec-timer');
          break;
        case 'w': // Alt + W -> Focus Weather details
          e.preventDefault();
          navigateToSection('sec-weather');
          break;
      }
    }

    // Escape returns to dashboard
    if (e.key === 'Escape') {
      const activeSection = document.querySelector('section.app-section.active');
      if (activeSection && activeSection.id !== 'sec-dashboard') {
        e.preventDefault();
        navigateToSection('sec-dashboard');
      }
    }
  });

  // Helper bindings
  function navigateToSection(secId) {
    if (window.NavigationModule) {
      window.NavigationModule.navigateTo(secId);
    }
  }

  function focusElement(elId) {
    const el = document.getElementById(elId);
    if (el) {
      setTimeout(() => el.focus(), 150);
    }
  }

  function refreshAllMetrics() {
    if (window.TodoModule) window.TodoModule.updateStats();
    if (window.GoalsModule) window.GoalsModule.updateStats();
    if (window.PlannerModule) window.PlannerModule.updateStats();
    if (window.PomodoroModule) window.PomodoroModule.updateStats();
  }
});
