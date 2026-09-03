import SectionTitle from "../components/SectionTitle";
import skills from "../data/skills";

function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-28 lg:py-32">
      <div className="w-full max-w-[80rem] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
        <div data-section-title>
          <SectionTitle title="Skills" subtitle="Technologies and tools I work with" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {skills.map((skillGroup) => (
            <div
              key={skillGroup.category}
              data-skill-card
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 lg:p-8 transition-all duration-300 hover:border-lime-400/20"
            >
              <h3 className="text-lg font-semibold text-white mb-5 sm:mb-6">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3.5 sm:px-4 py-2 rounded-lg text-sm text-gray-300 border border-white/10 bg-white/[0.04] hover:text-lime-300 hover:border-lime-400/30 transition-colors duration-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
