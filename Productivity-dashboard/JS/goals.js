/**
 * Goals.js
 * Controls targets CRUD. Coordinates circle charts, percentage counters, and 
 * triggers a confetti celebration animation when all goals are checked.
 */
const GoalsModule = {
  goals: [],

  init() {
    this.injectConfettiStyles();
    this.loadGoals();

    const form = document.getElementById('goal-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addGoal();
      });
    }

    this.renderGoals();
  },

  loadGoals() {
    if (window.Storage) {
      this.goals = window.Storage.load('aeroflow_goals', []);
    } else {
      const data = localStorage.getItem('aeroflow_goals');
      this.goals = data ? JSON.parse(data) : [];
    }
    this.updateStats();
  },

  saveGoals() {
    if (window.Storage) {
      window.Storage.save('aeroflow_goals', this.goals);
    } else {
      localStorage.setItem('aeroflow_goals', JSON.stringify(this.goals));
    }
    this.updateStats();
  },

  addGoal() {
    const input = document.getElementById('goal-input');
    if (!input || !input.value.trim()) return;

    const newGoal = {
      id: Date.now().toString(),
      text: input.value.trim(),
      completed: false,
      dateAdded: Date.now()
    };

    this.goals.push(newGoal);
    this.saveGoals();
    this.renderGoals();

    input.value = '';

    if (window.showToast) {
      window.showToast('Goal target registered', 'success');
    }
  },

  toggleComplete(id) {
    let completedTransitionedToTrue = false;

    this.goals = this.goals.map(goal => {
      if (goal.id === id) {
        const nextState = !goal.completed;
        if (nextState) completedTransitionedToTrue = true;
        
        if (window.showToast) {
          window.showToast(nextState ? 'Goal achieved!' : 'Goal reactivated', 'success');
        }
        return { ...goal, completed: nextState };
      }
      return goal;
    });

    this.saveGoals();
    this.renderGoals();

    // Challenge check: if progress is 100% and a goal was just completed, celebrate
    if (completedTransitionedToTrue) {
      const total = this.goals.length;
      const completed = this.goals.filter(g => g.completed).length;
      if (total > 0 && completed === total) {
        this.triggerConfetti();
        if (window.showToast) {
          window.showToast('Congratulations! All daily goals completed!', 'success');
        }
      }
    }
  },

  deleteGoal(id) {
    this.goals = this.goals.filter(goal => goal.id !== id);
    this.saveGoals();
    this.renderGoals();

    if (window.showToast) {
      window.showToast('Goal deleted', 'danger');
    }
  },

  updateStats() {
    const total = this.goals.length;
    const completed = this.goals.filter(g => g.completed).length;
    const remaining = total - completed;
    
    // Percentage calculation
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Update Dashboard statistical grid widgets
    const percentEl = document.getElementById('metric-goals-percent');
    const labelEl = document.getElementById('metric-goals-label');
    const barEl = document.getElementById('metric-goals-bar');
    const navBadge = document.getElementById('badge-goals-summary');

    if (percentEl) percentEl.textContent = `${percent}%`;
    if (labelEl) labelEl.textContent = `${completed} goal${completed === 1 ? '' : 's'} completed`;
    if (barEl) barEl.style.width = `${percent}%`;

    if (navBadge) {
      navBadge.textContent = total > 0 ? `${percent}% completed` : 'No goals today';
      navBadge.style.background = total > 0 ? (percent === 100 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)') : 'rgba(100, 116, 139, 0.1)';
      navBadge.style.color = total > 0 ? (percent === 100 ? 'var(--success)' : 'var(--warning)') : 'var(--text-muted)';
    }

    // Update Module Full-screen status indicators
    const fullTextEl = document.getElementById('goals-count-text');
    const fullPercentEl = document.getElementById('goals-text-percent');
    const svgCircle = document.getElementById('goals-svg-circle');

    if (fullTextEl) {
      if (total > 0) {
        fullTextEl.textContent = `${completed} of ${total} Goals Completed (${remaining} remaining)`;
      } else {
        fullTextEl.textContent = 'Add your targets to track daily goals.';
      }
    }
    if (fullPercentEl) fullPercentEl.textContent = `${percent}%`;
    
    if (svgCircle) {
      // Stroke dasharray computes circumference: 2 * PI * r = 2 * 3.14159 * 15.9155 = 100 units!
      // So percentage is mapping exactly to stroke-dasharray value!
      svgCircle.style.strokeDasharray = `${percent}, 100`;
    }
  },

  renderGoals() {
    const listUl = document.getElementById('goals-list-ul');
    const emptyState = document.getElementById('goals-empty-state');
    if (!listUl) return;

    listUl.innerHTML = '';

    if (this.goals.length === 0) {
      if (emptyState) emptyState.style.display = 'flex';
    } else {
      if (emptyState) emptyState.style.display = 'none';

      this.goals.forEach(goal => {
        const li = document.createElement('li');
        li.className = `goal-item glass-panel ${goal.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
          <div class="goal-checkbox-col">
            <input type="checkbox" id="goal-check-${goal.id}" ${goal.completed ? 'checked' : ''}>
            <label for="goal-check-${goal.id}"><i class="fa-solid fa-check"></i></label>
          </div>
          <div class="goal-text-col">
            <span class="goal-title-content">${this.escapeHTML(goal.text)}</span>
          </div>
          <div class="goal-actions-col">
            <button class="goal-del-btn" title="Delete Goal">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        `;

        // Event pins
        const check = li.querySelector('input[type="checkbox"]');
        check.addEventListener('change', () => this.toggleComplete(goal.id));

        const trash = li.querySelector('.goal-del-btn');
        trash.addEventListener('click', () => this.deleteGoal(goal.id));

        listUl.appendChild(li);
      });
    }
  },

  triggerConfetti() {
    // Generate particle shower
    const container = document.body;
    const colors = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'];
    const particleCount = 100;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'goal-confetti-particle';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = `${Math.random() * 100}vw`;
      p.style.width = `${Math.random() * 8 + 6}px`;
      p.style.height = `${Math.random() * 12 + 6}px`;
      
      const speed = Math.random() * 2 + 1.5;
      const angle = Math.random() * 30 + 75; // Angle going up
      const delay = Math.random() * 0.4;
      
      p.style.setProperty('--c-speed', `${speed}s`);
      p.style.setProperty('--c-delay', `${delay}s`);
      p.style.setProperty('--c-angle', `${Math.random() > 0.5 ? 1 : -1}`);
      p.style.setProperty('--c-distance', `${Math.random() * 40 + 20}vw`);
      
      container.appendChild(p);
      particles.push(p);
    }

    // Clean up particles
    setTimeout(() => {
      particles.forEach(p => p.remove());
    }, 3500);
  },

  injectConfettiStyles() {
    // Create inline class definitions for confetti physics
    if (document.getElementById('confetti-styles')) return;
    const styles = document.createElement('style');
    styles.id = 'confetti-styles';
    styles.innerHTML = `
      .goal-confetti-particle {
        position: fixed;
        bottom: 0;
        z-index: 10000;
        pointer-events: none;
        border-radius: 2px;
        opacity: 0.9;
        transform: translateY(0) rotate(0deg);
        animation: confettiFly var(--c-speed) cubic-bezier(0.12, 0.8, 0.35, 1) var(--c-delay) forwards;
      }

      @keyframes confettiFly {
        0% {
          bottom: -20px;
          transform: translateX(0) rotate(0deg);
          opacity: 1;
        }
        50% {
          opacity: 0.9;
        }
        100% {
          transform: translateY(-110vh) translateX(calc(var(--c-angle) * var(--c-distance))) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styles);
  },

  escapeHTML(str) {
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
window.GoalsModule = GoalsModule;
