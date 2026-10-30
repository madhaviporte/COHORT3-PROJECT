function ProgressBar({ percent = 0, label = 'Progress', tone = 'violet', showValue = false }) {
  const value = Math.min(100, Math.max(0, Math.round(Number(percent) || 0)));

  return (
    <div className="progress">
      {showValue && (
        <div className="progress-meta">
          <span>{label}</span>
          <strong>{value}%</strong>
        </div>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div className={`progress-fill progress-fill--${tone}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
