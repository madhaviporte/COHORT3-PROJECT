import { useState } from 'react';
import Modal from '../common/Modal';
import { generateId } from '../../utils/id';

const EMPTY_FORM = {
  title: '',
  category: 'DSA',
  difficulty: 'Easy',
  status: 'Pending',
  notes: '',
};

function QuestionForm({ question, onSave, onClose }) {
  const [form, setForm] = useState(question
    ? {
      title: question.title,
      category: question.category,
      difficulty: question.difficulty,
      status: question.status,
      notes: question.notes || '',
    }
    : EMPTY_FORM);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    if (name === 'title' && value.trim()) setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const title = form.title.trim();

    if (!title) {
      setError('Question title is required.');
      return;
    }

    onSave({
      ...(question || {}),
      id: question ? question.id : generateId(),
      title,
      category: form.category,
      difficulty: form.difficulty,
      status: form.status,
      notes: form.notes.trim(),
    });
  }

  return (
    <Modal title={question ? 'Edit question' : 'Add question'} onClose={onClose} size="md">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="tracker-title">Question title</label>
          <input
            id="tracker-title"
            name="title"
            type="text"
            placeholder="e.g. Build a debounced search input"
            value={form.title}
            onChange={handleChange}
            className={error ? 'input-error' : ''}
            aria-invalid={Boolean(error)}
            autoFocus
          />
          {error && <span className="field-error">{error}</span>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="tracker-category">Category</label>
            <select
              id="tracker-category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>DSA</option>
              <option>Git</option>
              <option>Technical</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="tracker-difficulty">Difficulty</label>
            <select
              id="tracker-difficulty"
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="tracker-status">Status</label>
            <select
              id="tracker-status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="tracker-notes">
            Notes <span className="field-optional">(optional)</span>
          </label>
          <textarea
            id="tracker-notes"
            name="notes"
            rows={3}
            placeholder="Approach, edge cases, complexity..."
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            {question ? 'Save changes' : 'Add question'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default QuestionForm;
