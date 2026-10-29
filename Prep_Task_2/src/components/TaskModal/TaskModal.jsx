import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import './TaskModal.scss';

const initialForm = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
};

function TaskModal({ isOpen, task, onClose, onSave }) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData(
        task
          ? {
              title: task.title,
              description: task.description || '',
              priority: task.priority,
              dueDate: task.dueDate || '',
            }
          : { ...initialForm }
      );
      setError('');
    }
  }, [isOpen, task]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (name === 'title') setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = formData.title.trim();
    if (!title) {
      setError('Task title is required.');
      return;
    }

    onSave({
      ...formData,
      title,
      description: formData.description.trim(),
      id: task?.id,
      status: task?.status || 'todo',
    });
  };

  return (
    <div
      className="task-modal__backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        <div className="task-modal__header">
          <h2 id="task-modal-title">{task ? 'Edit Task' : 'Add New Task'}</h2>

          <button
            type="button"
            className="task-modal__close"
            aria-label="Close modal"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="task-modal__field">
            <label htmlFor="task-title">Title *</label>
            <input
              id="task-title"
              name="title"
              type="text"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
              autoFocus
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'task-title-error' : undefined}
            />
            {error && (
              <p className="task-modal__error" id="task-title-error">
                {error}
              </p>
            )}
          </div>

          <div className="task-modal__field">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              name="description"
              rows="4"
              placeholder="Enter task description (optional)"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="task-modal__field">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="task-modal__field">
            <label htmlFor="task-due-date">Due Date</label>
            <input
              id="task-due-date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="task-modal__footer">
            <button type="button" className="task-modal__cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="task-modal__submit">
              {task ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default TaskModal;
