/**
 * Planner.js
 * Controls the hourly schedule grid (8 AM - 8 PM), status categories (past, present, future), 
 * debounced typing auto-saves, and syncs dashboard indicators.
 */
const PlannerModule = {
  plannerData: {}, // Format: { "08:00": "Wake up", "09:00": "Read mail"... }
  debounceTds: {}, // Holds timeout references for individual slot saves
  hoursList: [
    { label: '8 AM', value: 8 },
    { label: '9 AM', value: 9 },
    { label: '10 AM', value: 10 },
    { label: '11 AM', value: 11 },
    { label: '12 PM', value: 12 },
    { label: '1 PM', value: 13 },
    { label: '2 PM', value: 14 },
    { label: '3 PM', value: 15 },
    { label: '4 PM', value: 16 },
    { label: '5 PM', value: 17 },
    { label: '6 PM', value: 18 },
    { label: '7 PM', value: 19 },
    { label: '8 PM', value: 20 }
  ],

  init() {
    this.loadPlanner();
    this.renderPlanner();
    
    // Refresh classification every minute to keep highlights accurate
    setInterval(() => this.updateHourStatuses(), 60000);
  },

  loadPlanner() {
    const todayKey = this.getTodayDateKey();
    if (window.Storage) {
      this.plannerData = window.Storage.load(`aeroflow_planner_${todayKey}`, {});
    } else {
      const data = localStorage.getItem(`aeroflow_planner_${todayKey}`);
      this.plannerData = data ? JSON.parse(data) : {};
    }
    this.updateStats();
  },

  saveSlot(hourVal, textValue) {
    const todayKey = this.getTodayDateKey();
    this.plannerData[hourVal] = textValue;
    
    // Purge key if content is empty
    if (!textValue.trim()) {
      delete this.plannerData[hourVal];
    }

    if (window.Storage) {
      window.Storage.save(`aeroflow_planner_${todayKey}`, this.plannerData);
    } else {
      localStorage.setItem(`aeroflow_planner_${todayKey}`, JSON.stringify(this.plannerData));
    }
    
    this.updateStats();
    this.setSavedStatus(true);
  },

  getTodayDateKey() {
    const d = new Date();
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  },

  setSavedStatus(isSaved) {
    const statusEl = document.getElementById('planner-saved-status');
    if (statusEl) {
      if (isSaved) {
        statusEl.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Auto-saved';
        statusEl.style.opacity = '1';
        statusEl.style.color = 'var(--success)';
      } else {
        statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving changes...';
        statusEl.style.opacity = '0.7';
        statusEl.style.color = 'var(--text-muted)';
      }
    }
  },

  updateStats() {
    const filledCount = Object.keys(this.plannerData).length;
    const badge = document.getElementById('badge-planner-summary');
    if (badge) {
      if (filledCount > 0) {
        badge.textContent = `${filledCount} event${filledCount === 1 ? '' : 's'} scheduled`;
        badge.style.background = 'rgba(6, 182, 212, 0.15)';
        badge.style.color = 'var(--secondary)';
      } else {
        badge.textContent = 'None scheduled';
        badge.style.background = 'rgba(100, 116, 139, 0.1)';
        badge.style.color = 'var(--text-muted)';
      }
    }
  },

  renderPlanner() {
    const container = document.getElementById('planner-hours-container');
    if (!container) return;

    container.innerHTML = '';
    const currentHour = new Date().getHours();

    this.hoursList.forEach(slot => {
      let relativeClass = 'future-hour';
      let liveIndicator = '';
      
      if (slot.value < currentHour) {
        relativeClass = 'past-hour';
      } else if (slot.value === currentHour) {
        relativeClass = 'current-hour';
        liveIndicator = '<span class="planner-live-tag"><i class="fa-solid fa-hourglass-start fa-spin"></i> Active</span>';
      }

      const noteText = this.plannerData[slot.value] || '';

      const slotDiv = document.createElement('div');
      slotDiv.className = `planner-slot-card glass-panel ${relativeClass}`;
      slotDiv.id = `planner-slot-${slot.value}`;
      
      slotDiv.innerHTML = `
        <div class="planner-slot-time">
          <span class="time-label">${slot.label}</span>
          ${liveIndicator}
        </div>
        <div class="planner-slot-textbox">
          <textarea class="planner-textarea" placeholder="No plan added. Type notes here..." rows="2">${this.escapeHTML(noteText)}</textarea>
        </div>
      `;

      // Set input hooks
      const textarea = slotDiv.querySelector('textarea');
      
      textarea.addEventListener('input', (e) => {
        // Step 1: Reflect "Saving..." status immediately
        this.setSavedStatus(false);
        
        // Step 2: Clear old matching debounce timeouts
        if (this.debounceTds[slot.value]) {
          clearTimeout(this.debounceTds[slot.value]);
        }
        
        // Step 3: Trigger debounced execution
        this.debounceTds[slot.value] = setTimeout(() => {
          this.saveSlot(slot.value, e.target.value);
        }, 600);
      });

      // Highlight/Outline animation triggers on focus
      textarea.addEventListener('focus', () => {
        slotDiv.classList.add('focused');
      });
      textarea.addEventListener('blur', () => {
        slotDiv.classList.remove('focused');
      });

      container.appendChild(slotDiv);
    });
  },

  updateHourStatuses() {
    const currentHour = new Date().getHours();

    this.hoursList.forEach(slot => {
      const slotDiv = document.getElementById(`planner-slot-${slot.value}`);
      if (slotDiv) {
        // Clear classes
        slotDiv.classList.remove('past-hour', 'current-hour', 'future-hour');
        
        // Remove old live tags if they exist
        const oldTag = slotDiv.querySelector('.planner-live-tag');
        if (oldTag) oldTag.remove();

        if (slot.value < currentHour) {
          slotDiv.classList.add('past-hour');
        } else if (slot.value === currentHour) {
          slotDiv.classList.add('current-hour');
          const timeContainer = slotDiv.querySelector('.planner-slot-time');
          if (timeContainer) {
            timeContainer.insertAdjacentHTML('beforeend', '<span class="planner-live-tag"><i class="fa-solid fa-hourglass-start fa-spin"></i> Active</span>');
          }
        } else {
          slotDiv.classList.add('future-hour');
        }
      }
    });
  },

  escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
};
window.PlannerModule = PlannerModule;
