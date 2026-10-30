import { useState } from 'react';
import Modal from '../common/Modal';
import { generateId } from '../../utils/id';
import { isValidUrl } from '../../utils/validation';

const EMPTY_FORM = { title: '', topic: '', difficulty: 'Easy', link: '' };

function ProblemForm({ problem, onSave, onClose }) {
  const [form, setForm] = useState(problem
    ? {
      title: problem.title,
      topic: problem.topic,
      difficulty: problem.difficulty,
      link: problem.link || '',
    }
    : EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = 'Problem title is required.';
    if (!isValidUrl(form.link.trim())) {
      nextErrors.link = 'Enter a valid link starting with http:// or https://.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      ...(problem || {}),
      id: problem ? problem.id : generateId(),
      title: form.title.trim(),
      topic: form.topic.trim(),
      difficulty: form.difficulty,
      link: form.link.trim(),
      completed: problem ? problem.completed : false,
    });
  }

  return (
    <Modal title={problem ? 'Edit problem' : 'Add problem'} onClose={onClose} size="md">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="problem-title">Problem title</label>
          <input
            id="problem-title"
            name="title"
            type="text"
            placeholder="e.g. Two Sum"
            value={form.title}
            onChange={handleChange}
            className={errors.title ? 'input-error' : ''}
            aria-invalid={Boolean(errors.title)}
            autoFocus
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="problem-topic">
              Topic <span className="field-optional">(optional)</span>
            </label>
            <input
              id="problem-topic"
              name="topic"
              type="text"
              placeholder="e.g. Arrays / Hash Map"
              value={form.topic}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="problem-difficulty">Difficulty</label>
            <select
              id="problem-difficulty"
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="problem-link">
            Problem link <span className="field-optional">(optional)</span>
          </label>
          <input
            id="problem-link"
            name="link"
            type="url"
            placeholder="https://leetcode.com/problems/..."
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
            {problem ? 'Save changes' : 'Add problem'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ProblemForm;
