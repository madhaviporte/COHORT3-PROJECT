import TaskCard from '../TaskCard/TaskCard';
import './Column.scss';

function Column({ title, status, tasks, isFiltering, onEdit, onDelete, onStatusChange }) {
  return (
    <section className={`column column--${status}`}>
      <div className="column__header">
        <div className="column__title">
          <span className="column__dot" />
          <h2>{title}</h2>
        </div>
        <span className="column__count">{tasks.length}</span>
      </div>

      <div className="column__tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        ) : (
          <div className="column__empty">
            <p>{isFiltering ? 'No matching tasks' : 'No tasks yet'}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Column;
