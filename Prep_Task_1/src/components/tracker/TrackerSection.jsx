import { useState } from 'react';
import {
  BookOpen,
  Code2,
  GitBranch,
  Pencil,
  Plus,
  Search,
  Terminal,
  Trash2,
} from 'lucide-react';
import Badge from '../common/Badge';
import ConfirmDialog from '../common/ConfirmDialog';
import EmptyState from '../common/EmptyState';
import ProgressBar from '../common/ProgressBar';
import SectionHeader from '../common/SectionHeader';
import QuestionForm from './QuestionForm';
import SearchFilter from './SearchFilter';
import {
  EMPTY_FILTERS,
  filterTrackerQuestions,
  hasActiveFilters,
} from '../../utils/filters';
import { getTrackerProgress } from '../../utils/progress';
import { slugify } from '../../utils/format';

const CATEGORY_ICONS = {
  DSA: Code2,
  Git: GitBranch,
  Technical: BookOpen,
};

function TrackerSection({ questions, onUpdate }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [formOpen, setFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const progress = getTrackerProgress(questions);
  const filtered = filterTrackerQuestions(questions, filters);
  const filtering = hasActiveFilters(filters);

  function openCreate() {
    setEditingQuestion(null);
    setFormOpen(true);
  }

  function openEdit(question) {
    setEditingQuestion(question);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingQuestion(null);
  }

  function handleSave(saved) {
    onUpdate(editingQuestion
      ? questions.map((question) => (question.id === saved.id ? saved : question))
      : [...questions, saved]);
    closeForm();
  }

  function handleStatusChange(id, status) {
    onUpdate(questions.map((question) => (
      question.id === id ? { ...question, status } : question
    )));
  }

  function handleDelete() {
    onUpdate(questions.filter((question) => question.id !== deleteId));
    setDeleteId(null);
  }

  function resetFilters() {
    setFilters(EMPTY_FILTERS);
  }

  return (
    <section className="panel">
      <SectionHeader
        icon={Terminal}
        title="Frontend Machine Coding Round"
        meta={`${progress.done} of ${progress.total} questions completed`}
        accent="green"
      >
        <button type="button" className="btn btn--primary btn--sm" onClick={openCreate}>
          <Plus size={15} />
          Add question
        </button>
      </SectionHeader>

      <ProgressBar percent={progress.percent} label="Machine coding progress" tone="green" showValue />

      <SearchFilter filters={filters} onChange={setFilters} onReset={resetFilters} />

      {questions.length > 0 && (
        <p className="result-count" role="status">
          Showing {filtered.length} of {questions.length} question{questions.length === 1 ? '' : 's'}
          {filtering ? ' (filtered)' : ''}
        </p>
      )}

      {questions.length === 0 ? (
        <EmptyState
          icon={Terminal}
          title="No questions yet"
          message="Add your first machine coding question with its category, difficulty and status."
          action={{ label: 'Add a question', icon: Plus, onClick: openCreate }}
          compact
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No matching questions"
          message="No questions match your search and filters. Try different keywords or clear the filters."
          action={{ label: 'Clear filters', onClick: resetFilters }}
          compact
        />
      ) : (
        <div className="tracker-list">
          {filtered.map((question) => {
            const CategoryIcon = CATEGORY_ICONS[question.category] || BookOpen;

            return (
              <article className="tracker-row" key={question.id}>
                <span className="row-icon" aria-hidden="true">
                  <CategoryIcon size={16} />
                </span>

                <div className="row-text">
                  <h3>{question.title}</h3>
                  <div className="row-meta">
                    <span>{question.category}</span>
                    <Badge tone={question.difficulty.toLowerCase()}>{question.difficulty}</Badge>
                    {question.notes && (
                      <span className="meta-note" title={question.notes}>Notes</span>
                    )}
                  </div>
                </div>

                <div className="row-actions">
                  <select
                    className={`status-select status-select--${slugify(question.status)}`}
                    value={question.status}
                    onChange={(event) => handleStatusChange(question.id, event.target.value)}
                    aria-label={`Status for ${question.title}`}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                  <button
                    type="button"
                    className="icon-btn"
                    title="Edit question"
                    aria-label={`Edit ${question.title}`}
                    onClick={() => openEdit(question)}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn icon-btn--danger"
                    title="Delete question"
                    aria-label={`Delete ${question.title}`}
                    onClick={() => setDeleteId(question.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {formOpen && (
        <QuestionForm
          question={editingQuestion}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete question?"
          message="This question will be permanently removed from this week's tracker."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </section>
  );
}

export default TrackerSection;
