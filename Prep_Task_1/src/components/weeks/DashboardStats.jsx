import { BookOpenCheck, CalendarRange, Code2, Terminal } from 'lucide-react';
import { getDashboardStats } from '../../utils/progress';

function StatCard({ icon: Icon, accent, label, value, hint, percent }) {
  return (
    <article className={`stat-card stat-card--${accent}`}>
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        <span className={`stat-icon stat-icon--${accent}`} aria-hidden="true">
          <Icon size={17} />
        </span>
      </div>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-hint">{hint}</p>
      </div>
      <div className="stat-progress" aria-hidden="true">
        <span style={{ width: `${percent}%` }} />
      </div>
    </article>
  );
}

function DashboardStats({ weeks }) {
  const stats = getDashboardStats(weeks);

  return (
    <section className="stats-grid" aria-label="Overall statistics">
      <StatCard
        icon={CalendarRange}
        accent="violet"
        label="Weeks tracked"
        value={stats.weekCount}
        hint={`${stats.averageProgress}% average progress`}
        percent={stats.averageProgress}
      />
      <StatCard
        icon={Code2}
        accent="green"
        label="DSA solved"
        value={`${stats.dsa.done}/${stats.dsa.total}`}
        hint={`${stats.dsa.percent}% of all problems`}
        percent={stats.dsa.percent}
      />
      <StatCard
        icon={BookOpenCheck}
        accent="sky"
        label="Interview Q&A reviewed"
        value={`${stats.reviewed.done}/${stats.reviewed.total}`}
        hint="Git and full-stack questions"
        percent={stats.reviewed.percent}
      />
      <StatCard
        icon={Terminal}
        accent="amber"
        label="Machine coding completed"
        value={`${stats.tracker.done}/${stats.tracker.total}`}
        hint="Tracker questions finished"
        percent={stats.tracker.percent}
      />
    </section>
  );
}

export default DashboardStats;
