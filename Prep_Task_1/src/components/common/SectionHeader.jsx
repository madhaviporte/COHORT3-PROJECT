function SectionHeader({ icon: Icon, title, meta, accent = 'violet', children }) {
  return (
    <div className="section-header">
      <div className="section-header-main">
        <span className={`section-icon section-icon--${accent}`} aria-hidden="true">
          {Icon && <Icon size={16} />}
        </span>
        <div className="section-header-text">
          <h2>{title}</h2>
          {meta && <p>{meta}</p>}
        </div>
      </div>
      {children && <div className="section-header-actions">{children}</div>}
    </div>
  );
}

export default SectionHeader;
