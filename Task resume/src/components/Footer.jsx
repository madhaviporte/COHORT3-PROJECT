function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5">
      <div className="section-container py-16 sm:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <a href="#" className="text-xl font-bold text-white hover:text-lime-400 transition-colors">
            YOUR_NAME<span className="text-lime-400">.</span>
          </a>
          <div className="flex items-center gap-8">
            <a href="YOUR_GITHUB_URL" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">GitHub</a>
            <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">LinkedIn</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">Resume</a>
          </div>
          <p className="text-sm text-gray-500">&copy; {currentYear} YOUR_NAME. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
