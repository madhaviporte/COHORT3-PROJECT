import { useEffect } from 'react';
import { CalendarDays, Code2, LayoutDashboard, X } from 'lucide-react';
import { WEEK_SECTIONS } from '../../data/sections';
import { getWeekOverallProgress } from '../../utils/progress';

function Sidebar({
  weeks,
  activeWeek,
  activeSection,
  onShowAll,
  onOpenWeek,
  onSelectSection,
  isOpen,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    function handleResize() {
      if (window.innerWidth > 960) onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? 'is-visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <Code2 size={20} />
          </span>
          <div className="brand-text">
            <strong>PrepTrack</strong>
            <span>Weekly assignments</span>
          </div>
          <button type="button" className="icon-btn sidebar-close" onClick={onClose} aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-label">Dashboard</p>
          <button
            type="button"
            className={`nav-item ${!activeWeek ? 'is-active' : ''}`}
            onClick={onShowAll}
            aria-current={!activeWeek ? 'page' : undefined}
          >
            <LayoutDashboard size={17} aria-hidden="true" />
            <span className="nav-item-text">All weeks</span>
            <span className="nav-count">{weeks.length}</span>
          </button>

          <p className="nav-label">Weeks</p>
          {weeks.length === 0 ? (
            <p className="nav-empty">No weeks yet — create one to begin.</p>
          ) : (
            weeks.map((week) => (
              <button
                type="button"
                key={week.id}
                className={`nav-item ${activeWeek?.id === week.id ? 'is-active' : ''}`}
                onClick={() => onOpenWeek(week.id)}
                aria-current={activeWeek?.id === week.id ? 'page' : undefined}
              >
                <CalendarDays size={17} aria-hidden="true" />
                <span className="nav-item-text">{week.title}</span>
                <span className="nav-percent">{getWeekOverallProgress(week)}%</span>
              </button>
            ))
          )}

          {activeWeek && (
            <>
              <p className="nav-label">Sections</p>
              {WEEK_SECTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  type="button"
                  key={id}
                  className={`nav-subitem ${activeSection === id ? 'is-active' : ''}`}
                  onClick={() => onSelectSection(id)}
                  aria-current={activeSection === id ? 'true' : undefined}
                >
                  <Icon size={15} aria-hidden="true" />
                  <span className="nav-item-text">{label}</span>
                </button>
              ))}
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <span className="avatar" aria-hidden="true">PT</span>
          <div>
            <strong>My workspace</strong>
            <p>{weeks.length} week{weeks.length === 1 ? '' : 's'} saved in this browser</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
