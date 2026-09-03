import SectionTitle from "../components/SectionTitle";

const achievements = [
  {
    id: 1,
    icon: "🏆",
    number: "500+",
    title: "Coding Problems",
    description: "Solved 300+ coding and DSA problems on CodeChef, LeetCode and GeeksforGeeks."
  },
  {
    id: 2,
    icon: "⭐⭐",
    number: "2-Star",
    title: "CodeChef",
    description: "Achieved a 3-Star rating through competitive programming."
  },
  {
    id: 3,
    icon: "🚀",
    number: "6+",
    title: "Full-Stack Projects",
    description: "Built 6+ full-stack web applications using the MERN stack."
  },
  {
    id: 4,
    icon: "🏅",
    number: "Top 15 Pitching",
    title: "Hackathon",
    description: "Secured Top 15 in the hackathon pitching round among 200+ teams in a hackathon."
  }
];
function Achievements() {
  return (
    <section id="achievements" className="py-24 sm:py-28 lg:py-32">
      <div className="w-full max-w-[80rem] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
        <div data-section-title>
          <SectionTitle title="Achievements" subtitle="Milestones and accomplishments" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {achievements.map((item) => (
            <div key={item.id} data-achiev-card className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 text-center transition-all duration-300 hover:border-lime-400/20 group">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(163,230,53,0.05)", border: "1px solid rgba(163,230,53,0.1)" }}>
                {item.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-lime-400 mb-3">{item.number}</div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
