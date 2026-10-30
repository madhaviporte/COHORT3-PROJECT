function Badge({ tone = 'neutral', icon: Icon, children }) {
  return (
    <span className={`badge badge--${tone}`}>
      {Icon && <Icon size={12} aria-hidden="true" />}
      {children}
    </span>
  );
}

export default Badge;
