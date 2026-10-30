import { CalendarDays, LayoutDashboard, Menu } from 'lucide-react';
import { formatDate } from '../../utils/format';

const TODAY_LABEL = formatDate(new Date());

function Topbar({ breadcrumb, onOpenMenu }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button type="button" className="icon-btn menu-btn" onClick={onOpenMenu} aria-label="Open navigation">
          <Menu size={20} />
        </button>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <LayoutDashboard size={14} aria-hidden="true" />
          <span>{breadcrumb}</span>
        </nav>
      </div>
      <span className="topbar-chip">
        <CalendarDays size={14} aria-hidden="true" />
        {TODAY_LABEL}
      </span>
    </header>
  );
}

export default Topbar;
