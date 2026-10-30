import { Search, X } from 'lucide-react';
import {
  ALL_CATEGORIES,
  ALL_DIFFICULTIES,
  ALL_STATUSES,
  hasActiveFilters,
} from '../../utils/filters';

function SearchFilter({ filters, onChange, onReset }) {
  function update(patch) {
    onChange({ ...filters, ...patch });
  }

  return (
    <div className="filters" role="search" aria-label="Search and filter machine coding questions">
      <div className="search-box">
        <Search size={16} aria-hidden="true" />
        <input
          type="search"
          placeholder="Search by question title..."
          aria-label="Search questions by title"
          value={filters.search}
          onChange={(event) => update({ search: event.target.value })}
        />
      </div>

      <select
        aria-label="Filter by category"
        value={filters.category}
        onChange={(event) => update({ category: event.target.value })}
      >
        <option>{ALL_CATEGORIES}</option>
        <option>DSA</option>
        <option>Git</option>
        <option>Technical</option>
      </select>

      <select
        aria-label="Filter by difficulty"
        value={filters.difficulty}
        onChange={(event) => update({ difficulty: event.target.value })}
      >
        <option>{ALL_DIFFICULTIES}</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <select
        aria-label="Filter by status"
        value={filters.status}
        onChange={(event) => update({ status: event.target.value })}
      >
        <option>{ALL_STATUSES}</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      {hasActiveFilters(filters) && (
        <button type="button" className="btn btn--ghost btn--sm filter-reset" onClick={onReset}>
          <X size={14} />
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchFilter;
