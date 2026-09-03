import SectionTitle from "../components/SectionTitle";

function About() {
  const highlights = ["Full Stack Development", "UI/UX Design", "Problem Solving", "Clean Code"];
  const interests = ["Web Development", "Cloud Computing", "Open Source", "DevOps", "System Design"];

  return (
    <section id="about" className="py-24 sm:py-28 lg:py-32">
      <div className="w-full max-w-[80rem] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
        <div data-section-title>
          <SectionTitle title="About Me" subtitle="A passionate developer crafting digital experiences" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile image */}
          <div data-about-left className="shrink-0">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(163,230,53,0.1), rgba(163,230,53,0.05))", border: "1px solid rgba(163,230,53,0.2)" }}>
                <img src="/images/profile/photo.jpg" alt="Madhavi Porte - Profile Photo" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-3xl -z-10" style={{ border: "2px solid rgba(163,230,53,0.2)" }} />
            </div>
          </div>

          {/* Text content */}
          <div data-about-right className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6 sm:mb-8 leading-snug">
              A dedicated developer with a passion for creating impactful digital solutions.
            </h3>
            <div className="space-y-5 text-base sm:text-lg text-gray-400 leading-relaxed mb-8 sm:mb-10">
           <p>
  I enjoy turning ideas into real-world web applications and learning through hands-on projects. Building different applications has helped me improve my problem-solving and development skills.
</p>

<p>
  I focus on writing clean, simple code and creating smooth user experiences. I’m always interested in learning new technologies and working on meaningful projects.
</p>

            </div>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8 sm:mb-10">
              {highlights.map((item) => (
                <span key={item} className="px-5 py-2.5 text-sm text-lime-400 rounded-lg" style={{ backgroundColor: "rgba(163,230,53,0.05)", border: "1px solid rgba(163,230,53,0.1)" }}>
                  {item}
                </span>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Areas of Interest</h4>
              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                {interests.map((interest) => (
                  <span key={interest} className="px-4 py-2 text-xs text-gray-400 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    {interest}
                  </span>
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
