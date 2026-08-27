import { useState, useEffect } from "react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav
      data-navbar
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-18 md:h-20">
          <a href="#" className="text-xl md:text-2xl font-bold text-white hover:text-lime-400 transition-colors">
            YOUR_NAME<span className="text-lime-400">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm text-gray-400 hover:text-lime-400 transition-colors duration-200">
                {link.name}
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              className="px-6 py-2.5 text-sm font-medium border border-lime-400/50 text-lime-400 rounded-lg hover:bg-lime-400/10 transition-all duration-200">
              Resume
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button className="lg:hidden relative w-10 h-10 flex items-center justify-center" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation" aria-expanded={isOpen}>
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`block h-0.5 bg-white transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-18 bg-[#050505]/95 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-center gap-8 pt-16">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-300 hover:text-lime-400 transition-colors duration-200">
                {link.name}
              </a>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}
              className="mt-4 px-8 py-3 text-lg font-medium border border-lime-400/50 text-lime-400 rounded-lg hover:bg-lime-400/10 transition-all duration-200">
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
