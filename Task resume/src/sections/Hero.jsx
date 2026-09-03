import Button from "../components/Button";

function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "rgba(163,230,53,0.05)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: "rgba(163,230,53,0.03)" }} />

      <div className="relative w-full max-w-[80rem] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 py-20 sm:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <div
              data-hero-badge
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 sm:mb-10"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="w-2 h-2 bg-lime-400 rounded-full" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span className="text-sm text-gray-400">Open to opportunities</span>
            </div>

            <h1 data-hero-heading className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6 sm:mb-8">
              Hi, I&apos;m<br />
              <span className="text-lime-400">MADHAVI PORTE</span>
            </h1>

            <p data-hero-role className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 font-light mb-6 sm:mb-8 leading-snug">
              FULL STACK MERN DEVELOPER
            </p>

            <p data-hero-intro className="text-base sm:text-lg text-gray-400 mb-10 sm:mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
              I am a Full Stack MERN Developer building scalable, AI-powered web applications. Skilled in both front-end and back-end development, I specialize in React, Node.js, Express, and MongoDB to create seamless user experiences and efficient solutions.
            </p>

            <div data-hero-buttons className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 justify-center lg:justify-start mb-10 sm:mb-12">
              <Button href="#projects" variant="primary">View Projects</Button>
              <Button href="#contact" variant="secondary">Contact Me</Button>
            </div>

            <div data-hero-social className="flex items-center gap-6 sm:gap-8 justify-center lg:justify-start">
              <a href="https://github.com/madhaviporte" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 transition-colors" aria-label="GitHub Profile">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/madhavi-porte-091219329/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 transition-colors" aria-label="LinkedIn Profile">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right visual */}
          <div data-hero-visual className="hidden lg:flex flex-1 items-center justify-center">
            <div className="relative w-88 h-88">
              <div className="absolute inset-0 rounded-full" style={{ border: "2px dashed rgba(163,230,53,0.1)", animation: "spin-slow 30s linear infinite" }} />
              <div className="absolute rounded-full" style={{ inset: "2rem", border: "1px solid rgba(163,230,53,0.2)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-3xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(163,230,53,0.1), rgba(163,230,53,0.05))", border: "1px solid rgba(163,230,53,0.2)" }}>
                  <span className="text-6xl font-bold text-lime-400">{">"}_</span>
                </div>
              </div>
              <div className="absolute w-3 h-3 rounded-full" style={{ top: "2rem", right: "3rem", backgroundColor: "rgba(163,230,53,0.4)" }} />
              <div className="absolute w-2 h-2 rounded-full" style={{ bottom: "3rem", left: "2rem", backgroundColor: "rgba(163,230,53,0.3)" }} />
              <div className="absolute w-2.5 h-2.5 rounded-full" style={{ top: "50%", right: "0", backgroundColor: "rgba(163,230,53,0.2)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
