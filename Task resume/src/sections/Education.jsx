import SectionTitle from "../components/SectionTitle";

const education = [
  { id: 1, degree: "YOUR_DEGREE", institution: "YOUR_INSTITUTION", duration: "START_DATE - END_DATE", description: "YOUR_EDUCATION_DESCRIPTION" },
  { id: 2, degree: "YOUR_DEGREE", institution: "YOUR_INSTITUTION", duration: "START_DATE - END_DATE", description: "YOUR_EDUCATION_DESCRIPTION" },
];

function Education() {
  return (
    <section id="education" className="section-spacing">
      <div className="section-container">
        <div data-section-title>
          <SectionTitle title="Education" subtitle="My academic background" />
        </div>
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {education.map((item) => (
            <div key={item.id} data-edu-card className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-lime-400/20">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">{item.degree}</h3>
                  <p className="text-base mt-1.5" style={{ color: "rgba(163,230,53,0.7)" }}>{item.institution}</p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">{item.duration}</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
