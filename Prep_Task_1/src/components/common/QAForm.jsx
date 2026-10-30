import { useState } from 'react';
import Modal from './Modal';
import { generateId } from '../../utils/id';

function QAForm({ item, itemLabel = 'question', onSave, onClose }) {
  const [form, setForm] = useState({
    question: item ? item.question : '',
    answer: item ? item.answer : '',
    notes: item ? item.notes || '' : '',
  });
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    if (name === 'question' && value.trim()) setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const question = form.question.trim();

    if (!question) {
      setError('Question is required.');
      return;
    }

    onSave({
      ...(item || {}),
      id: item ? item.id : generateId(),
      question,
      answer: form.answer.trim(),
      notes: form.notes.trim(),
      reviewed: item ? item.reviewed : false,
    });
  }

  return (
    <Modal title={`${item ? 'Edit' : 'Add'} ${itemLabel}`} onClose={onClose} size="md">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="qa-question">Question</label>
          <input
            id="qa-question"
            name="question"
            type="text"
            placeholder="Enter the interview question..."
            value={form.question}
            onChange={handleChange}
            className={error ? 'input-error' : ''}
            aria-invalid={Boolean(error)}
            autoFocus
          />
          {error && <span className="field-error">{error}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="qa-answer">Answer</label>
          <textarea
            id="qa-answer"
            name="answer"
            rows={6}
            placeholder="Write a clear, detailed answer..."
            value={form.answer}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="qa-notes">
            Notes <span className="field-optional">(optional)</span>
          </label>
          <textarea
            id="qa-notes"
            name="notes"
            rows={2}
            placeholder="Extra tips, examples or reminders..."
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            {item ? 'Save changes' : 'Add question'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default QAForm;
