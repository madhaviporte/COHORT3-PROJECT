import { CalendarDays, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import {
  getCustomSectionsProgress,
  getDSAProgress,
  getQAProgress,
  getTrackerProgress,
  getWeekOverallProgress,
} from '../../utils/progress';
import { formatDate } from '../../utils/format';

function WeekCard({ week, onOpen, onEdit, onDelete }) {
  const dsa = getDSAProgress(week.dsaProblems || []);
  const git = getQAProgress(week.gitQuestions || []);
  const technical = getQAProgress(week.fullstackQuestions || []);
  const tracker = getTrackerProgress(week.trackerQuestions || []);
  const custom = getCustomSectionsProgress(week.customSections || []);
  const overall = getWeekOverallProgress(week);

  return (
    <article className="week-card">
      <div className="week-card-top">
        <div className="week-card-heading">
          <h3>{week.title}</h3>
          {week.description && <p>{week.description}</p>}
          <span className="week-card-date">
            <CalendarDays size={13} aria-hidden="true" />
            Created {formatDate(week.createdAt)}
          </span>
        </div>
        <div className="week-card-actions">
          <button
            type="button"
            className="icon-btn"
            title="Edit week"
            aria-label={`Edit ${week.title}`}
            onClick={onEdit}
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            className="icon-btn icon-btn--danger"
            title="Delete week"
            aria-label={`Delete ${week.title}`}
            onClick={onDelete}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div>
        <div className="week-card-progress-label">
          <span>Overall progress</span>
          <strong>{overall}%</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label={`${week.title} overall progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={overall}
        >
          <div className="progress-fill" style={{ width: `${overall}%` }} />
        </div>
      </div>

      <ul className="week-card-chips">
        <li><span>DSA</span><strong>{dsa.done}/{dsa.total}</strong></li>
        <li><span>Git</span><strong>{git.done}/{git.total}</strong></li>
        <li><span>Full stack</span><strong>{technical.done}/{technical.total}</strong></li>
        <li><span>Tracker</span><strong>{tracker.done}/{tracker.total}</strong></li>
        {custom.total > 0 && (
          <li><span>Custom</span><strong>{custom.done}/{custom.total}</strong></li>
        )}
      </ul>

      <button type="button" className="week-card-open" onClick={onOpen}>
        Open week
        <ChevronRight size={16} />
      </button>
    </article>
  );
}

export default WeekCard;
