import { Pencil, Trash2, CalendarDays } from 'lucide-react';
import './TaskCard.scss';

function formatDate(dateString) {
  if (!dateString) return 'No due date';
  const date = new Date(`${dateString}T00:00:00`);
  if (isNaN(date.getTime())) return 'No due date';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

  return (
    <article className={`task-card task-card--${task.priority}`}>
      <div className="task-card__top">
        <span className={`task-card__priority task-card__priority--${task.priority}`}>
          {priorityLabel}
        </span>

        <div className="task-card__actions">
          <button
            type="button"
            aria-label={`Edit ${task.title}`}
            title="Edit task"
            onClick={() => onEdit(task)}
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            aria-label={`Delete ${task.title}`}
            title="Delete task"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3 className="task-card__title">{task.title}</h3>

      {task.description && (
        <p className="task-card__description">{task.description}</p>
      )}

      <div className="task-card__footer">
        <span className="task-card__date">
          <CalendarDays size={15} />
          {formatDate(task.dueDate)}
        </span>

        <select
          className="task-card__status"
          aria-label={`Change status of ${task.title}`}
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </article>
  );
}

export default TaskCard;
