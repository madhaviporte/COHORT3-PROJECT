import { useState } from 'react';
import Modal from '../common/Modal';
import { generateId } from '../../utils/id';
import { isValidUrl } from '../../utils/validation';

function CustomTaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState({
    title: task ? task.title : '',
    description: task ? task.description || '' : '',
    link: task ? task.link || '' : '',
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = 'Task title is required.';
    if (!isValidUrl(form.link.trim())) {
      nextErrors.link = 'Enter a valid link starting with http:// or https://.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      ...(task || {}),
      id: task ? task.id : generateId(),
      title: form.title.trim(),
      description: form.description.trim(),
      link: form.link.trim(),
      completed: task ? task.completed : false,
    });
  }

  return (
    <Modal title={task ? 'Edit task' : 'Add task'} onClose={onClose} size="md">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="task-title">Task title</label>
          <input
            id="task-title"
            name="title"
            type="text"
            placeholder="e.g. Solve 10 aptitude questions"
            value={form.title}
            onChange={handleChange}
            className={errors.title ? 'input-error' : ''}
            aria-invalid={Boolean(errors.title)}
            autoFocus
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="task-description">
            Description / answer <span className="field-optional">(optional)</span>
          </label>
          <textarea
            id="task-description"
            name="description"
            rows={4}
            placeholder="Notes, answers or details..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="task-link">
            Resource link <span className="field-optional">(optional)</span>
          </label>
          <input
            id="task-link"
            name="link"
            type="url"
            placeholder="https://..."
            value={form.link}
            onChange={handleChange}
            className={errors.link ? 'input-error' : ''}
            aria-invalid={Boolean(errors.link)}
          />
          {errors.link && <span className="field-error">{errors.link}</span>}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            {task ? 'Save changes' : 'Add task'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CustomTaskForm;
