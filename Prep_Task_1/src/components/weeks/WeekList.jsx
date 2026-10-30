import { useState } from 'react';
import { CalendarPlus, LayoutDashboard } from 'lucide-react';
import ConfirmDialog from '../common/ConfirmDialog';
import EmptyState from '../common/EmptyState';
import DashboardStats from './DashboardStats';
import WeekCard from './WeekCard';
import WeekForm from './WeekForm';

function WeekList({ weeks, onCreateWeek, onOpenWeek, onEditWeek, onDeleteWeek }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingWeek, setEditingWeek] = useState(null);
  const [deleteWeekId, setDeleteWeekId] = useState(null);

  const weekToDelete = weeks.find((week) => week.id === deleteWeekId);

  function handleCreate(data) {
    onCreateWeek(data);
    setShowCreateForm(false);
  }

  function handleEdit(data) {
    onEditWeek(editingWeek.id, data);
    setEditingWeek(null);
  }

  function handleDelete() {
    onDeleteWeek(deleteWeekId);
    setDeleteWeekId(null);
  }

  return (
    <div className="page">
      <header className="page-heading">
        <div>
          <p className="eyebrow">Weekly assignment dashboard</p>
          <h1 className="page-title">All weeks</h1>
          <p className="page-subtitle">
            Track DSA, Git, full-stack interviews and machine coding practice for every assignment week.
          </p>
        </div>
        <button type="button" className="btn btn--primary" onClick={() => setShowCreateForm(true)}>
          <CalendarPlus size={17} />
          Create week
        </button>
      </header>

      <DashboardStats weeks={weeks} />

      {weeks.length === 0 ? (
        <EmptyState
          icon={LayoutDashboard}
          title="No weeks yet"
          message="Create your first week. It is generated automatically with all four default sections so you can start tracking right away."
          action={{
            label: 'Create your first week',
            icon: CalendarPlus,
            onClick: () => setShowCreateForm(true),
          }}
        />
      ) : (
        <section aria-label="Weekly assignments">
          <div className="list-heading">
            <h2>Your weeks</h2>
            <span className="list-heading-meta">
              {weeks.length} week{weeks.length === 1 ? '' : 's'} saved locally
            </span>
          </div>
          <div className="week-cards-grid">
            {weeks.map((week) => (
              <WeekCard
                key={week.id}
                week={week}
                onOpen={() => onOpenWeek(week.id)}
                onEdit={() => setEditingWeek(week)}
                onDelete={() => setDeleteWeekId(week.id)}
              />
            ))}
          </div>
        </section>
      )}

      {showCreateForm && (
        <WeekForm
          weeks={weeks}
          onSave={handleCreate}
          onClose={() => setShowCreateForm(false)}
        />
      )}

      {editingWeek && (
        <WeekForm
          week={editingWeek}
          weeks={weeks}
          onSave={handleEdit}
          onClose={() => setEditingWeek(null)}
        />
      )}

      {weekToDelete && (
        <ConfirmDialog
          title={`Delete "${weekToDelete.title}"?`}
          message="This permanently deletes the week with all its problems, questions, answers and custom sections. This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteWeekId(null)}
        />
      )}
    </div>
  );
}

export default WeekList;
