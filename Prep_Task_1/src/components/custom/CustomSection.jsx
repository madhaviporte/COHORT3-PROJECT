import { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  ExternalLink,
  Layers,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import ConfirmDialog from '../common/ConfirmDialog';
import EmptyState from '../common/EmptyState';
import ProgressBar from '../common/ProgressBar';
import CustomTaskForm from './CustomTaskForm';
import { getCustomSectionProgress } from '../../utils/progress';

function CustomSection({ section, onUpdateTasks, onEditSection, onDeleteSection }) {
  const [collapsed, setCollapsed] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [confirmDeleteSection, setConfirmDeleteSection] = useState(false);

  const tasks = section.tasks || [];
  const progress = getCustomSectionProgress(tasks);

  function openCreateTask() {
    setEditingTask(null);
    setFormOpen(true);
  }

  function openEditTask(task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingTask(null);
  }

  function handleSaveTask(saved) {
    onUpdateTasks(editingTask
      ? tasks.map((task) => (task.id === saved.id ? saved : task))
      : [...tasks, saved]);
    closeForm();
  }

  function toggleTask(id) {
    onUpdateTasks(tasks.map((task) => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )));
  }

  function handleDeleteTask() {
    onUpdateTasks(tasks.filter((task) => task.id !== deleteTaskId));
    setDeleteTaskId(null);
  }

  return (
    <section className="panel panel--custom">
      <div className="custom-header">
        <div className="custom-header-main">
          <span className="section-icon section-icon--violet" aria-hidden="true">
            <Layers size={16} />
          </span>
          <div>
            <h2>{section.title}</h2>
            <p>{section.description || 'No description added for this section.'}</p>
          </div>
        </div>

        <div className="custom-header-actions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={openCreateTask}>
            <Plus size={14} />
            Add task
          </button>
          <button
            type="button"
            className="icon-btn"
            title="Edit section"
            aria-label={`Edit ${section.title}`}
            onClick={onEditSection}
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            className="icon-btn icon-btn--danger"
            title="Delete section"
            aria-label={`Delete ${section.title}`}
            onClick={() => setConfirmDeleteSection(true)}
          >
            <Trash2 size={15} />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand section' : 'Collapse section'}
            onClick={() => setCollapsed((value) => !value)}
          >
            {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          <ProgressBar
            percent={progress.percent}
            label={`${section.title} progress`}
            tone="sky"
            showValue
          />
          <p className="custom-meta">
            {progress.done} of {progress.total} task{progress.total === 1 ? '' : 's'} completed
          </p>

          {tasks.length === 0 ? (
            <EmptyState
              icon={Layers}
              title="No tasks in this section"
              message="Add a task with a description or resource link to start tracking this topic."
              compact
            />
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <article key={task.id} className={`task-item ${task.completed ? 'task-item--done' : ''}`}>
                  <button
                    type="button"
                    className={`check-btn ${task.completed ? 'check-btn--done' : ''}`}
                    onClick={() => toggleTask(task.id)}
                    aria-pressed={Boolean(task.completed)}
                    aria-label={task.completed ? `Mark ${task.title} as pending` : `Mark ${task.title} as done`}
                  >
                    {task.completed ? <CheckCircle2 size={19} /> : <Circle size={19} />}
                  </button>

                  <div className="task-text">
                    <h3 className={task.completed ? 'is-done' : ''}>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                    {task.link && (
                      <a
                        className="link-chip"
                        href={task.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={12} />
                        Open link
                      </a>
                    )}
                  </div>

                  <div className="task-actions">
                    <button
                      type="button"
                      className="icon-btn"
                      title="Edit task"
                      aria-label={`Edit ${task.title}`}
                      onClick={() => openEditTask(task)}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      className="icon-btn icon-btn--danger"
                      title="Delete task"
                      aria-label={`Delete ${task.title}`}
                      onClick={() => setDeleteTaskId(task.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}

      {formOpen && (
        <CustomTaskForm task={editingTask} onSave={handleSaveTask} onClose={closeForm} />
      )}

      {deleteTaskId && (
        <ConfirmDialog
          title="Delete task?"
          message="This task will be permanently removed from this custom section."
          onConfirm={handleDeleteTask}
          onCancel={() => setDeleteTaskId(null)}
        />
      )}

      {confirmDeleteSection && (
        <ConfirmDialog
          title={`Delete "${section.title}"?`}
          message="This deletes the section and all of its tasks from this week. This cannot be undone."
          onConfirm={onDeleteSection}
          onCancel={() => setConfirmDeleteSection(false)}
        />
      )}
    </section>
  );
}

export default CustomSection;
