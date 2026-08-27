import SectionTitle from "../components/SectionTitle";

const achievements = [
  { id: 1, icon: "🏆", number: "YOUR_NUMBER", title: "YOUR_ACHIEVEMENT", description: "YOUR_ACHIEVEMENT_DESCRIPTION" },
  { id: 2, icon: "⭐", number: "YOUR_NUMBER", title: "YOUR_ACHIEVEMENT", description: "YOUR_ACHIEVEMENT_DESCRIPTION" },
  { id: 3, icon: "🎯", number: "YOUR_NUMBER", title: "YOUR_ACHIEVEMENT", description: "YOUR_ACHIEVEMENT_DESCRIPTION" },
  { id: 4, icon: "💡", number: "YOUR_NUMBER", title: "YOUR_ACHIEVEMENT", description: "YOUR_ACHIEVEMENT_DESCRIPTION" },
];

function Achievements() {
  return (
    <section id="achievements" className="section-spacing">
      <div className="section-container">
        <div data-section-title>
          <SectionTitle title="Achievements" subtitle="Milestones and accomplishments" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {achievements.map((item) => (
            <div key={item.id} data-achiev-card className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 text-center transition-all duration-300 hover:border-lime-400/20 group">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110" style={{ backgroundColor: "rgba(163,230,53,0.05)", border: "1px solid rgba(163,230,53,0.1)", transition: "transform 0.3s ease" }}>
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
