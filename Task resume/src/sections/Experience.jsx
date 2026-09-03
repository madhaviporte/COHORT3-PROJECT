import SectionTitle from "../components/SectionTitle";
import experience from "../data/experience";

function ExperienceCard({ item }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 lg:p-8 transition-all duration-300 hover:border-lime-400/20">
      <span className="inline-block px-4 py-1.5 text-xs text-lime-400 rounded-full mb-4" style={{ backgroundColor: "rgba(163,230,53,0.1)" }}>
        {item.duration}
      </span>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.role}</h3>
      <p className="text-sm sm:text-base mb-4" style={{ color: "rgba(163,230,53,0.7)" }}>{item.company}</p>
      <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-5">{item.description}</p>
      <div className="flex flex-wrap gap-2">
        {item.technologies.map((tech) => (
          <span key={tech} className="px-3 py-1.5 text-xs text-gray-400 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)" }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-28 lg:py-32">
      <div className="w-full max-w-[80rem] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
        <div data-section-title>
          <SectionTitle title="Experience" subtitle="My professional journey" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Desktop center timeline line */}
          <div className="hidden md:block absolute top-0 bottom-0" style={{ left: "50%", width: "1px", backgroundColor: "rgba(255,255,255,0.1)", transform: "translateX(-50%)" }} />
          {/* Mobile left timeline line */}
          <div className="md:hidden absolute top-0 bottom-0" style={{ left: 0, width: "1px", backgroundColor: "rgba(255,255,255,0.1)" }} />

          <div className="space-y-14 sm:space-y-16">
            {experience.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id} data-exp-card className="relative">
                  {/* Desktop dot */}
                  <div className="hidden md:block absolute" style={{ left: "50%", top: "1.5rem", width: "12px", height: "12px", backgroundColor: "#a3e635", borderRadius: "50%", transform: "translateX(-50%)", zIndex: 10, boxShadow: "0 0 0 4px #050505" }} />
                  {/* Mobile dot */}
                  <div className="md:hidden absolute" style={{ left: 0, top: "1.5rem", width: "12px", height: "12px", backgroundColor: "#a3e635", borderRadius: "50%", transform: "translateX(-50%)", zIndex: 10, boxShadow: "0 0 0 4px #050505" }} />
                  {/* Mobile layout */}
                  <div className="md:hidden pl-10">
                    <ExperienceCard item={item} />
                  </div>
                  {/* Desktop layout */}
                  <div className="exp-row-desktop">
                    {isEven ? (
                      <>
                        <div className="text-right pr-10">
                          <ExperienceCard item={item} />
                        </div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <div className="pl-10">
                          <ExperienceCard item={item} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
