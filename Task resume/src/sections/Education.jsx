import SectionTitle from "../components/SectionTitle";

const education = [
  {
    id: 1,
    degree: "Bachelor of Technology (B.Tech) - Computer Science and Engineering",
    institution: "Indian Institute of Information Technology Ranchi",
    duration: "Aug 2023 - May 2027",
    description:
      "I am currently pursuing my Bachelor of Technology (B.Tech) in Computer Science and Engineering from the Indian Institute of Information Technology Ranchi. I joined in 2023 and my expected graduation year is 2027. During my college journey, I am learning core computer science subjects like Data Structures and Algorithms, Web Development, Database Management Systems, and Object-Oriented Programming. I am gradually building my understanding of how software development works in real-world scenarios. Along with academics, I also work on projects to apply what I learn and improve my development skills.",
  },
  {
    id: 2,
    degree: "Cohort 2.0 - MERN Stack Development, DSA & Aptitude Training",
    institution: "Sheriyans Coding School",
    duration: "Sept 2025 - June 2026",
    description:
      "Completed the Job Ready AI-Powered Cohort 2.0, an intensive training program focused on becoming a job-ready software engineer. The program covered MERN stack development, Data Structures and Algorithms (DSA), and aptitude training. Through this cohort, I gained hands-on experience in building full-stack applications, improving problem-solving skills, and strengthening my overall technical foundation for placements and real-world development.",
  },
  {
    id: 3,
    degree: "CBSE(XII) - PCM with Fundamental Computer Science",
    institution: "DAV Public School",
    duration: "Apr 2020 - March 2021",
    description:
      "I completed my Class 12 education from DAV Public School under the CBSE board, where I studied Physics, Chemistry, and Mathematics (PCM) along with Fundamental Computer Science.",
  },
  {
    id: 4,
    degree: "CBSE(X)",
    institution: "DAV Public School",
    duration: "Apr 2018 - March 2019",
    description:
      "I completed my Class 10 education from DAV Public School under the CBSE board, where I studied Science, Social Science, Mathematics, Hindi, and English.",
  },
];


function Education() {
  return (
    <section id="education" className="py-24 sm:py-28 lg:py-32">
      <div className="w-full max-w-[80rem] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
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
