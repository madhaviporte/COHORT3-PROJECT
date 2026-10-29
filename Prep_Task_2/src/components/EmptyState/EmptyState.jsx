import { ClipboardList, PlusCircle } from 'lucide-react';
import './EmptyState.scss';

function EmptyState({ message, subMessage, showAddButton, onAddTask }) {
  return (
    <div className="empty-state">
      <ClipboardList size={48} className="empty-state__icon" />
      <h3 className="empty-state__message">{message}</h3>
      {subMessage && <p className="empty-state__sub">{subMessage}</p>}
      {showAddButton && (
        <button type="button" className="empty-state__btn" onClick={onAddTask}>
          <PlusCircle size={16} />
          Add your first task
        </button>
      )}
    </div>
  );
}

export default EmptyState;
