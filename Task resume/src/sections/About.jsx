import SectionTitle from "../components/SectionTitle";

function About() {
  const highlights = ["Full Stack Development", "UI/UX Design", "Problem Solving", "Clean Code"];
  const interests = ["Web Development", "Cloud Computing", "Open Source", "DevOps", "System Design"];

  return (
    <section id="about" className="section-spacing">
      <div className="section-container">
        <div data-section-title>
          <SectionTitle title="About Me" subtitle="A passionate developer crafting digital experiences" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div data-about-left className="shrink-0">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(163,230,53,0.1), rgba(163,230,53,0.05))", border: "1px solid rgba(163,230,53,0.2)" }}>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
                  </div>
                  <p className="text-sm text-gray-500">Your Photo</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-3xl -z-10" style={{ border: "2px solid rgba(163,230,53,0.2)" }} />
            </div>
          </div>

          <div data-about-right className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6 sm:mb-8 leading-snug">
              A dedicated developer with a passion for creating impactful digital solutions.
            </h3>
            <div className="space-y-5 text-base sm:text-lg text-gray-400 leading-relaxed mb-8 sm:mb-10">
              <p>YOUR_ABOUT_TEXT_PARAGRAPH_1. Write about your background, education, and what drives you as a developer. Share your journey and experiences that have shaped your career.</p>
              <p>YOUR_ABOUT_TEXT_PARAGRAPH_2. Describe your approach to development, your philosophy on writing code, and what kind of projects excite you the most.</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8 sm:mb-10">
              {highlights.map((item) => (
                <span key={item} className="px-5 py-2.5 text-sm text-lime-400 rounded-lg" style={{ backgroundColor: "rgba(163,230,53,0.05)", border: "1px solid rgba(163,230,53,0.1)" }}>{item}</span>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Areas of Interest</h4>
              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                {interests.map((interest) => (
                  <span key={interest} className="px-4 py-2 text-xs text-gray-400 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)" }}>{interest}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
