function ProjectCard({ project }) {
  const { title, description, image, technologies, githubUrl, liveUrl, featured } = project;

  return (
    <div data-project-card className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-lime-400/20">
      {featured && (
        <div className="absolute top-5 right-5 z-10 px-3.5 py-1.5 bg-lime-400 text-black text-xs font-semibold rounded-full">
          Featured
        </div>
      )}

      <div className="aspect-video bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center border-b border-white/5">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center px-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center">
              <span className="text-3xl text-lime-400/50 font-bold">{title.charAt(0)}</span>
            </div>
            <p className="text-xs text-gray-500">Project Screenshot</p>
          </div>
        )}
      </div>

      <div className="p-6 lg:p-8">
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-lime-400 transition-colors">{title}</h3>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-5 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span key={tech} className="px-3 py-1.5 text-xs text-lime-400/80 bg-lime-400/5 border border-lime-400/10 rounded-lg">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5 pt-1">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-lime-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              <span>Code</span>
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-lime-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
