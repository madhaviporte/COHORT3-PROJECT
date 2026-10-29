import './SearchFilter.scss';

function SearchFilter({ search, priority, status, onSearchChange, onPriorityChange, onStatusChange }) {
  return (
    <section className="search-filter">
      <input
        type="search"
        placeholder="Search tasks..."
        aria-label="Search tasks"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select
        aria-label="Filter by priority"
        value={priority}
        onChange={(event) => onPriorityChange(event.target.value)}
      >
        <option value="all">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select
        aria-label="Filter by status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="all">All statuses</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </section>
  );
}

export default SearchFilter;
