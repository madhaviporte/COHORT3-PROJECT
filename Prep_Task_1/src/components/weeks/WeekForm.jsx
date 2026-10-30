import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Modal from '../common/Modal';
import { getNextWeekTitle, validateWeekTitle } from '../../utils/weeks';

function WeekForm({ week, weeks = [], onSave, onClose }) {
  const [title, setTitle] = useState(week ? week.title : getNextWeekTitle(weeks));
  const [description, setDescription] = useState(week ? week.description || '' : '');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const message = validateWeekTitle(title, weeks, week ? week.id : null);

    if (message) {
      setError(message);
      return;
    }

    onSave({ title: title.trim(), description: description.trim() });
  }

  return (
    <Modal title={week ? 'Edit week' : 'Create week'} onClose={onClose} size="sm">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="week-title">Week title</label>
          <input
            id="week-title"
            type="text"
            placeholder="e.g. Week 1"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (event.target.value.trim()) setError('');
            }}
            className={error ? 'input-error' : ''}
            aria-invalid={Boolean(error)}
            autoFocus
          />
          {error && <span className="field-error">{error}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="week-description">
            Description <span className="field-optional">(optional)</span>
          </label>
          <textarea
            id="week-description"
            rows={3}
            placeholder="Focus areas, due date, mentor notes..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        {!week && (
          <p className="form-hint">
            <Sparkles size={14} aria-hidden="true" />
            New weeks start with DSA, Git, Full Stack and Machine Coding sections.
          </p>
        )}

        <div className="form-actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            {week ? 'Save changes' : 'Create week'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default WeekForm;
