/**
 * Navigation.js
 * Handles view switching between the home dashboard grid and the fullscreen feature modules.
 */
const NavigationModule = {
  activeSectionId: 'sec-dashboard',

  init() {
    const cards = document.querySelectorAll('.feature-grid .feature-card');
    const backBtn = document.getElementById('btn-global-back');
    const logoLink = document.getElementById('logo-link');

    // Bind cards to page targets
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const targetSection = card.getAttribute('data-target');
        if (targetSection) {
          this.navigateTo(`sec-${targetSection}`);
        }
      });
    });

    // Bind back button
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.navigateTo('sec-dashboard');
      });
    }

    // Logo returns to dashboard
    if (logoLink) {
      logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateTo('sec-dashboard');
      });
    }

    // Listen to hash exchanges
    window.addEventListener('hashchange', () => this.handleHashChange());
    this.handleHashChange();
  },

  navigateTo(sectionId) {
    const sections = document.querySelectorAll('section.app-section');
    const backBtn = document.getElementById('btn-global-back');

    // Find and hide active sections
    sections.forEach(sec => {
      sec.classList.remove('active');
    });

    // Make target visible
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      this.activeSectionId = sectionId;
    } else {
      // Fallback
      document.getElementById('sec-dashboard').classList.add('active');
      this.activeSectionId = 'sec-dashboard';
    }

    // Toggle Back button visibility
    if (backBtn) {
      if (this.activeSectionId === 'sec-dashboard') {
        backBtn.style.display = 'none';
      } else {
        backBtn.style.display = 'flex';
      }
    }

    // Update URL hash without polluting history if just a simple change
    const hash = this.activeSectionId.replace('sec-', '');
    if (hash === 'dashboard') {
      if (window.location.hash) {
        history.pushState('', document.title, window.location.pathname + window.location.search);
      }
    } else {
      window.location.hash = hash;
    }

    // Clear dynamic states like Pomodoro alarm checks, focus scroll resets, etc.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  handleHashChange() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const parsedId = `sec-${hash}`;
      const targetSec = document.getElementById(parsedId);
      if (targetSec && this.activeSectionId !== parsedId) {
        this.navigateTo(parsedId);
      }
    } else if (this.activeSectionId !== 'sec-dashboard') {
      this.navigateTo('sec-dashboard');
    }
  }
};
window.NavigationModule = NavigationModule;
