function EmptyState({ icon: Icon, title, message, action, compact = false }) {
  const ActionIcon = action?.icon;

  return (
    <div className={`empty-state ${compact ? 'empty-state--compact' : ''}`}>
      {Icon && (
        <span className="empty-state-icon" aria-hidden="true">
          <Icon size={22} />
        </span>
      )}
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action && (
        <button type="button" className="btn btn--primary btn--sm" onClick={action.onClick}>
          {ActionIcon && <ActionIcon size={14} />}
          {action.label}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
