/**
 * Todo.js
 * Controls task lists (CRUD, searches, filters, multi-levels priority sorting, local storage, counts sync).
 */
const TodoModule = {
  tasks: [],
  currentFilter: 'all',
  currentSort: 'dateAdded',

  init() {
    this.loadTasks();

    const form = document.getElementById('todo-form');
    const searchInput = document.getElementById('todo-search-input');
    const sortSelect = document.getElementById('todo-sort-select');
    const filterButtons = document.querySelectorAll('.todo-filter-btn');
    const fabButton = document.getElementById('global-fab-task');

    // Submit form handler
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addTask();
      });
    }

    // Keyboard support - Enter submit works naturally via form submission.
    // Let's add escape/clearing features or click focuses.

    // Search task handler
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        this.renderTasks();
      });
    }

    // Sort options handler
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderTasks();
      });
    }

    // Filter controls
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter');
        this.renderTasks();
      });
    });

    // FAB functionality: navigate to Todo screen and focus input
    if (fabButton) {
      fabButton.addEventListener('click', () => {
        if (window.NavigationModule) {
          window.NavigationModule.navigateTo('sec-todo');
        }
        const todoInput = document.getElementById('todo-input');
        if (todoInput) {
          todoInput.focus();
        }
      });
    }

    // Initial render
    this.renderTasks();
  },

  loadTasks() {
    if (window.Storage) {
      this.tasks = window.Storage.load('aeroflow_tasks', []);
    } else {
      const data = localStorage.getItem('aeroflow_tasks');
      this.tasks = data ? JSON.parse(data) : [];
    }
    this.updateStats();
  },

  saveTasks() {
    if (window.Storage) {
      window.Storage.save('aeroflow_tasks', this.tasks);
    } else {
      localStorage.setItem('aeroflow_tasks', JSON.stringify(this.tasks));
    }
    this.updateStats();
  },

  addTask() {
    const input = document.getElementById('todo-input');
    const prioritySelect = document.getElementById('todo-priority');
    const dueDateInput = document.getElementById('todo-duedate');

    if (!input || !input.value.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: input.value.trim(),
      completed: false,
      important: false,
      priority: prioritySelect ? prioritySelect.value : 'medium',
      dueDate: dueDateInput ? dueDateInput.value : '',
      dateAdded: Date.now()
    };

    this.tasks.push(newTask);
    this.saveTasks();
    this.renderTasks();

    // Clear UI inputs
    input.value = '';
    if (dueDateInput) dueDateInput.value = '';
    if (prioritySelect) prioritySelect.value = 'medium';

    if (window.showToast) {
      window.showToast('Task added successfully', 'success');
    }
  },

  toggleComplete(id) {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        const nextState = !task.completed;
        if (window.showToast) {
          window.showToast(nextState ? 'Task completed' : 'Task marked pending', 'success');
        }
        return { ...task, completed: nextState };
      }
      return task;
    });
    this.saveTasks();
    this.renderTasks();
  },

  toggleImportant(id) {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        const nextState = !task.important;
        if (window.showToast) {
          window.showToast(nextState ? 'Marked task as important' : 'Removed importance flag', 'info');
        }
        return { ...task, important: nextState };
      }
      return task;
    });
    this.saveTasks();
    this.renderTasks();
  },

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
    this.renderTasks();

    if (window.showToast) {
      window.showToast('Task deleted', 'danger');
    }
  },

  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;

    // Update Dashboard statistical grid widgets
    const countEl = document.getElementById('metric-tasks-count');
    const labelEl = document.getElementById('metric-tasks-label');
    const navBadge = document.getElementById('badge-todo-summary');

    if (countEl) countEl.textContent = `${completed} / ${total}`;
    if (labelEl) labelEl.textContent = `${pending} pending task${pending === 1 ? '' : 's'}`;
    
    if (navBadge) {
      navBadge.textContent = pending > 0 ? `${pending} pending` : 'All caught up';
      navBadge.style.background = pending > 0 ? 'rgba(79, 70, 229, 0.15)' : 'rgba(16, 185, 129, 0.15)';
      navBadge.style.color = pending > 0 ? 'var(--primary)' : 'var(--success)';
    }

    // Sync with external elements (e.g. planner summary checks)
  },

  renderTasks() {
    const listUl = document.getElementById('task-list-ul');
    const emptyState = document.getElementById('todo-empty-state');
    const searchInput = document.getElementById('todo-search-input');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    if (!listUl) return;
    listUl.innerHTML = '';

    // 1. Filter Tasks
    let filtered = this.tasks.filter(task => {
      // Filter tab check
      if (this.currentFilter === 'completed' && !task.completed) return false;
      if (this.currentFilter === 'pending' && task.completed) return false;
      if (this.currentFilter === 'important' && !task.important) return false;

      // Search keyword check
      if (query && !task.text.toLowerCase().includes(query)) return false;

      return true;
    });

    // 2. Sort Tasks
    filtered.sort((a, b) => {
      if (this.currentSort === 'dateAdded') {
        return b.dateAdded - a.dateAdded; // Newest first
      }
      if (this.currentSort === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate); // Closest first
      }
      if (this.currentSort === 'priority') {
        const valueMap = { high: 3, medium: 2, low: 1 };
        return valueMap[b.priority] - valueMap[a.priority]; // Highest level first
      }
      return 0;
    });

    // 3. Render HTML
    if (filtered.length === 0) {
      if (emptyState) emptyState.style.display = 'flex';
    } else {
      if (emptyState) emptyState.style.display = 'none';

      filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item glass-panel ${task.completed ? 'completed' : ''}`;
        
        // Priority color border tag
        li.style.borderLeft = `4px solid var(--${task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'text-muted'})`;

        // Parse formatted due date text
        let dateBadgeHtml = '';
        if (task.dueDate) {
          const formatted = new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' });
          const isOverdue = !task.completed && new Date(task.dueDate) < new Date().setHours(0,0,0,0);
          dateBadgeHtml = `<span class="task-date-tag ${isOverdue ? 'overdue' : ''}">
            <i class="fa-regular fa-clock"></i> ${formatted}${isOverdue ? ' (Overdue)' : ''}
          </span>`;
        }

        li.innerHTML = `
          <div class="task-checkbox-col">
            <input type="checkbox" id="check-${task.id}" ${task.completed ? 'checked' : ''}>
            <label for="check-${task.id}"><i class="fa-solid fa-check"></i></label>
          </div>
          <div class="task-text-col">
            <span class="task-title-content">${this.escapeHTML(task.text)}</span>
            <div class="task-badges">
              <span class="task-priority-tag tag-${task.priority}">${task.priority.toUpperCase()}</span>
              ${dateBadgeHtml}
            </div>
          </div>
          <div class="task-actions-col">
            <button class="task-imp-btn" title="Toggle Important">
              <i class="${task.important ? 'fa-solid' : 'fa-regular'} fa-star"></i>
            </button>
            <button class="task-del-btn" title="Delete Task">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        `;

        // Event hooks
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => this.toggleComplete(task.id));

        const impBtn = li.querySelector('.task-imp-btn');
        impBtn.addEventListener('click', () => this.toggleImportant(task.id));

        const delBtn = li.querySelector('.task-del-btn');
        delBtn.addEventListener('click', () => this.deleteTask(task.id));

        listUl.appendChild(li);
      });
    }
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
window.TodoModule = TodoModule;
