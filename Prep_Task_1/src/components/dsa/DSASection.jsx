import { useState } from 'react';
import { CheckCircle2, Circle, Code2, ExternalLink, Pencil, Plus, Trash2 } from 'lucide-react';
import Badge from '../common/Badge';
import ConfirmDialog from '../common/ConfirmDialog';
import EmptyState from '../common/EmptyState';
import ProgressBar from '../common/ProgressBar';
import SectionHeader from '../common/SectionHeader';
import ProblemForm from './ProblemForm';
import { getDSAProgress } from '../../utils/progress';

function DSASection({ problems, onUpdate }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const progress = getDSAProgress(problems);

  function openCreate() {
    setEditingProblem(null);
    setFormOpen(true);
  }

  function openEdit(problem) {
    setEditingProblem(problem);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingProblem(null);
  }

  function handleSave(saved) {
    onUpdate(editingProblem
      ? problems.map((problem) => (problem.id === saved.id ? saved : problem))
      : [...problems, saved]);
    closeForm();
  }

  function toggleCompleted(id) {
    onUpdate(problems.map((problem) => (
      problem.id === id ? { ...problem, completed: !problem.completed } : problem
    )));
  }

  function handleDelete() {
    onUpdate(problems.filter((problem) => problem.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <section className="panel">
      <SectionHeader
        icon={Code2}
        title="DSA Practice"
        meta={`${progress.done} of ${progress.total} problems solved`}
        accent="violet"
      >
        <button type="button" className="btn btn--primary btn--sm" onClick={openCreate}>
          <Plus size={15} />
          Add problem
        </button>
      </SectionHeader>

      <ProgressBar percent={progress.percent} label="DSA progress" showValue />

      {problems.length === 0 ? (
        <EmptyState
          icon={Code2}
          title="No problems yet"
          message="Add a LeetCode problem with its topic, difficulty and link to start tracking."
          compact
        />
      ) : (
        <div className="problem-list">
          {problems.map((problem) => {
            const isDone = Boolean(problem.completed);

            return (
              <article key={problem.id} className={`problem-card ${isDone ? 'problem-card--done' : ''}`}>
                <button
                  type="button"
                  className={`check-btn ${isDone ? 'check-btn--done' : ''}`}
                  onClick={() => toggleCompleted(problem.id)}
                  aria-pressed={isDone}
                  aria-label={isDone ? `Mark ${problem.title} as pending` : `Mark ${problem.title} as solved`}
                >
                  {isDone ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>

                <div className="problem-main">
                  <h3 className={isDone ? 'is-done' : ''}>{problem.title}</h3>
                  <div className="problem-meta">
                    <span>{problem.topic || 'General'}</span>
                    <Badge tone={problem.difficulty.toLowerCase()}>{problem.difficulty}</Badge>
                  </div>
                </div>

                <div className="problem-actions">
                  {problem.link && (
                    <a
                      className="link-chip"
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={13} />
                      Open
                    </a>
                  )}
                  <button
                    type="button"
                    className="icon-btn"
                    title="Edit problem"
                    aria-label={`Edit ${problem.title}`}
                    onClick={() => openEdit(problem)}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn icon-btn--danger"
                    title="Delete problem"
                    aria-label={`Delete ${problem.title}`}
                    onClick={() => setDeleteId(problem.id)}
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
        <ProblemForm
          problem={editingProblem}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete problem?"
          message="This problem will be permanently removed from this week."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </section>
  );
}

export default DSASection;
