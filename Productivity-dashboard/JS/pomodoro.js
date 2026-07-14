/**
 * Pomodoro.js
 * Controls multi-mode countdown structures (Work, Short Break, Long Break).
 * Handles SVG round progress updates, audio notifications using local synthetics, 
 * standard Web Notifications, and interval rate locking.
 */
const PomodoroModule = {
  // Phase durations in minutes
  durations: {
    work: 25,
    short: 5,
    long: 15
  },
  
  currentMode: 'work', // work, short, long
  secondsLeft: 1500, // 25 * 60
  totalDurationSeconds: 1500,
  timerIntervalId: null,
  isPaused: true,
  sessionsCompletedCount: 0,

  init() {
    this.loadSessions();

    const modeBtnContainer = document.querySelector('.timer-mode-buttons');
    const startBtn = document.getElementById('btn-timer-start');
    const pauseBtn = document.getElementById('btn-timer-pause');
    const resetBtn = document.getElementById('btn-timer-reset');

    // Timer mode selects
    if (modeBtnContainer) {
      const modeButtons = modeBtnContainer.querySelectorAll('.timer-mode-btn');
      modeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          modeButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.switchMode(btn.getAttribute('data-mode'));
        });
      });
    }

    // Play button
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startTimer());
    }

    // Pause button
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => this.pauseTimer());
    }

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetTimer());
    }

    // Request notifications permission on interaction
    if ('Notification' in window && Notification.permission === 'default') {
      document.addEventListener('click', () => {
        if (Notification.permission === 'default') {
          Notification.requestPermission();
        }
      }, { once: true });
    }

    // Render initial digital time digits
    this.updateDisplay();
  },

  loadSessions() {
    if (window.Storage) {
      this.sessionsCompletedCount = window.Storage.load('aeroflow_pomodoro_sessions', 0);
    } else {
      this.sessionsCompletedCount = parseInt(localStorage.getItem('aeroflow_pomodoro_sessions') || '0', 10);
    }
    this.updateStats();
  },

  saveSessions() {
    if (window.Storage) {
      window.Storage.save('aeroflow_pomodoro_sessions', this.sessionsCompletedCount);
    } else {
      localStorage.setItem('aeroflow_pomodoro_sessions', this.sessionsCompletedCount.toString());
    }
    this.updateStats();
  },

  updateStats() {
    const badge = document.getElementById('timer-sessions-badge');
    const metricCount = document.getElementById('metric-pomodoro-count');
    const navBadge = document.getElementById('badge-timer-summary');

    if (badge) badge.textContent = this.sessionsCompletedCount;
    if (metricCount) metricCount.textContent = this.sessionsCompletedCount;

    // Update the Navigation Badge card details
    if (navBadge) {
      if (this.timerIntervalId && !this.isPaused) {
        navBadge.textContent = `${this.currentMode.toUpperCase()}: ${this.formatMMSS()}`;
        navBadge.style.background = 'rgba(239, 68, 68, 0.15)';
        navBadge.style.color = 'var(--danger)';
      } else {
        navBadge.textContent = `${this.sessionsCompletedCount} session${this.sessionsCompletedCount === 1 ? '' : 's'} done`;
        navBadge.style.background = 'rgba(100, 116, 139, 0.1)';
        navBadge.style.color = 'var(--text-muted)';
      }
    }
  },

  switchMode(mode) {
    this.pauseTimer();
    this.currentMode = mode;
    this.totalDurationSeconds = this.durations[mode] * 60;
    this.secondsLeft = this.totalDurationSeconds;
    
    // Switch state indicator on clock
    const stateLabel = document.getElementById('timer-display-state');
    if (stateLabel) {
      stateLabel.textContent = mode.toUpperCase();
      stateLabel.className = `state-label state-${mode}`;
    }

    this.updateDisplay();
    this.updateStats();

    if (window.showToast) {
      window.showToast(`Switched to ${mode === 'work' ? 'Focus Work session' : mode === 'short' ? 'Short Break' : 'Long Break'}`, 'info');
    }
  },

  startTimer() {
    if (this.timerIntervalId) return; // Prevent multiple interval rates from locking on secondary calls

    this.isPaused = false;
    this.toggleControlButtonsState(true);

    // Request active notifications triggers
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    this.timerIntervalId = setInterval(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.updateDisplay();
        this.updateStats();
      } else {
        this.timerCompleted();
      }
    }, 1000);

    if (window.showToast) {
      window.showToast('Pomodoro session started', 'success');
    }
  },

  pauseTimer() {
    if (!this.timerIntervalId) return;

    clearInterval(this.timerIntervalId);
    this.timerIntervalId = null;
    this.isPaused = true;
    this.toggleControlButtonsState(false);
    this.updateStats();

    if (window.showToast) {
      window.showToast('Timer paused', 'warning');
    }
  },

  resetTimer() {
    this.pauseTimer();
    this.secondsLeft = this.totalDurationSeconds;
    this.updateDisplay();
    this.updateStats();

    if (window.showToast) {
      window.showToast('Timer reset', 'info');
    }
  },

  timerCompleted() {
    this.pauseTimer();
    
    // Synthesize alarm sound bells
    this.playSynthesizedBell();

    // Fire browser Push notification
    this.fireOSNotification();

    // Increment completed focus sessions if it was work
    if (this.currentMode === 'work') {
      this.sessionsCompletedCount++;
      this.saveSessions();
      if (window.showToast) {
        window.showToast('Excellent! Focus session complete. Take a break!', 'success');
      }
    } else {
      if (window.showToast) {
        window.showToast('Break finished! Ready to focus?', 'success');
      }
    }

    // Auto-switch to natural next states helper
    if (this.currentMode === 'work') {
      // Prompt short break after session completion
      this.switchMode('short');
    } else {
      this.switchMode('work');
    }
  },

  updateDisplay() {
    const digits = document.getElementById('timer-display-digits');
    const progressRing = document.getElementById('timer-progress-ring');

    if (digits) {
      digits.textContent = this.formatMMSS();
    }

    if (progressRing) {
      // stroke-dasharray is static 283 units
      // progress is (secondsLeft / total)
      const ratio = this.secondsLeft / this.totalDurationSeconds;
      const offset = 283 * (1 - ratio);
      progressRing.style.strokeDashoffset = offset;
    }
  },

  formatMMSS() {
    const mm = Math.floor(this.secondsLeft / 60).toString().padStart(2, '0');
    const ss = (this.secondsLeft % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  },

  toggleControlButtonsState(isRunning) {
    const start = document.getElementById('btn-timer-start');
    const pause = document.getElementById('btn-timer-pause');
    
    if (start) start.disabled = isRunning;
    if (pause) pause.disabled = !isRunning;
  },

  playSynthesizedBell() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      // Play double warm harmonic sound
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5 chime note
      gain1.gain.setValueAtTime(0, ctx.currentTime);
      gain1.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.05);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.8);

      setTimeout(() => {
        try {
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(1109, ctx.currentTime); // Db6 chime note
          gain2.gain.setValueAtTime(0, ctx.currentTime);
          gain2.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.05);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
          osc2.start(ctx.currentTime);
          osc2.stop(ctx.currentTime + 0.9);
        } catch(e) {}
      }, 150);

    } catch (e) {
      console.warn("AudioContext block restriction or unsupported browser API:", e);
    }
  },

  fireOSNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = this.currentMode === 'work' ? 'Focus Session Completed!' : 'Break Time Finished!';
      const body = this.currentMode === 'work' 
        ? 'Amazing job focusing today. Now take a well-deserved short break.' 
        : 'Time to start setting goals. Let us get back to work!';
      
      try {
        new Notification(title, {
          body: body,
          icon: '/assets/icons/timer-done.png'
        });
      } catch (e) {
        console.warn("Notification constructor error inside current context:", e);
      }
    }
  }
};
window.PomodoroModule = PomodoroModule;
