function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5">
      <div className="w-full max-w-[80rem] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <a href="#" className="text-xl font-bold text-white hover:text-lime-400 transition-colors">
            MADHAVI PORTE<span className="text-lime-400">.</span>
          </a>
          <div className="flex items-center gap-8">
            <a href="https://github.com/madhaviporte" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/madhavi-porte-091219329/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">LinkedIn</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-lime-400 transition-colors">Resume</a>
          </div>
          <p className="text-sm text-gray-500">&copy; {currentYear} Madhavi porte All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
