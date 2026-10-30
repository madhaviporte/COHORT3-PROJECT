import { useState } from 'react';
import Modal from '../common/Modal';

function CustomSectionForm({ section, existingTitles = [], onSave, onClose }) {
  const [title, setTitle] = useState(section ? section.title : '');
  const [description, setDescription] = useState(section ? section.description || '' : '');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const value = title.trim();

    if (!value) {
      setError('Section title is required.');
      return;
    }

    const others = existingTitles.filter((existing) => (
      !section || existing !== section.title
    ));

    if (others.some((existing) => existing.trim().toLowerCase() === value.toLowerCase())) {
      setError(`A section named "${value}" already exists in this week.`);
      return;
    }

    onSave({ title: value, description: description.trim() });
  }

  return (
    <Modal title={section ? 'Edit custom section' : 'Add custom section'} onClose={onClose} size="sm">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="custom-section-title">Section title</label>
          <input
            id="custom-section-title"
            type="text"
            placeholder="e.g. Aptitude, System Design, HR Interview"
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
          <label htmlFor="custom-section-description">
            Description <span className="field-optional">(optional)</span>
          </label>
          <textarea
            id="custom-section-description"
            rows={2}
            placeholder="What does this section cover?"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            {section ? 'Save changes' : 'Create section'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CustomSectionForm;
