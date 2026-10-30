import { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import Badge from './Badge';
import ConfirmDialog from './ConfirmDialog';
import EmptyState from './EmptyState';
import ProgressBar from './ProgressBar';
import QAForm from './QAForm';
import SectionHeader from './SectionHeader';
import { getQAProgress } from '../../utils/progress';

function QAWorkspace({
  title,
  icon,
  accent = 'violet',
  questions,
  onUpdate,
  itemLabel = 'question',
  emptyTitle,
  emptyMessage,
}) {
  const [expanded, setExpanded] = useState({});
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const progress = getQAProgress(questions);

  function toggleExpanded(id) {
    setExpanded((previous) => ({ ...previous, [id]: !previous[id] }));
  }

  function toggleReviewed(id) {
    onUpdate(questions.map((question) => (
      question.id === id ? { ...question, reviewed: !question.reviewed } : question
    )));
  }

  function openCreate() {
    setEditingItem(null);
    setFormOpen(true);
  }

  function openEdit(item) {
    setEditingItem(item);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingItem(null);
  }

  function handleSave(saved) {
    onUpdate(editingItem
      ? questions.map((question) => (question.id === saved.id ? saved : question))
      : [...questions, saved]);
    closeForm();
  }

  function handleDelete() {
    onUpdate(questions.filter((question) => question.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <section className="panel">
      <SectionHeader
        icon={icon}
        title={title}
        meta={`${progress.done} of ${progress.total} reviewed`}
        accent={accent}
      >
        <button type="button" className="btn btn--primary btn--sm" onClick={openCreate}>
          <Plus size={15} />
          Add question
        </button>
      </SectionHeader>

      <ProgressBar percent={progress.percent} label={`${title} progress`} tone={accent} showValue />

      {questions.length === 0 ? (
        <EmptyState icon={icon} title={emptyTitle} message={emptyMessage} compact />
      ) : (
        <div className="qa-list">
          {questions.map((item) => {
            const isOpen = Boolean(expanded[item.id]);
            const panelId = `qa-panel-${item.id}`;

            return (
              <article key={item.id} className={`qa-card ${item.reviewed ? 'qa-card--reviewed' : ''}`}>
                <div className="qa-header">
                  <div className="qa-title">
                    <button
                      type="button"
                      className="qa-toggle"
                      onClick={() => toggleExpanded(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      aria-label={isOpen ? 'Hide answer' : 'Show answer'}
                    >
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <div className="qa-title-text">
                      <h3>{item.question}</h3>
                      <div className="qa-tags">
                        {item.reviewed && (
                          <Badge tone="success" icon={CheckCircle2}>Reviewed</Badge>
                        )}
                        {item.notes && <Badge tone="neutral">Has notes</Badge>}
                        {!item.answer && <Badge tone="warning">No answer yet</Badge>}
                      </div>
                    </div>
                  </div>

                  <div className="qa-actions">
                    <button
                      type="button"
                      className={`btn btn--sm ${item.reviewed ? 'btn--success-ghost' : 'btn--ghost'}`}
                      onClick={() => toggleReviewed(item.id)}
                      aria-pressed={item.reviewed}
                    >
                      {item.reviewed ? <><CheckCircle2 size={14} />Reviewed</> : 'Mark reviewed'}
                    </button>
                    <button
                      type="button"
                      className="icon-btn"
                      title="Edit question"
                      aria-label="Edit question"
                      onClick={() => openEdit(item)}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      className="icon-btn icon-btn--danger"
                      title="Delete question"
                      aria-label="Delete question"
                      onClick={() => setDeleteId(item.id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="qa-answer" id={panelId}>
                    <pre>{item.answer || 'No answer added yet.'}</pre>
                    {item.notes && (
                      <p className="qa-notes">
                        <span>Notes</span>
                        {item.notes}
                      </p>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {formOpen && (
        <QAForm
          item={editingItem}
          itemLabel={itemLabel}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete question?"
          message="This question, its answer and notes will be permanently removed from this week."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </section>
  );
}

export default QAWorkspace;
