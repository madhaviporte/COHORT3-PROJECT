import { useEffect, useRef } from "react";
import SectionTitle from "../components/SectionTitle";
import { gsap, prefersReducedMotion } from "../animations/gsapConfig";

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

const cardClass =
  "h-full rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 transition-all duration-300 hover:border-lime-400/20";

function Education() {
  const sectionRef = useRef(null);

  // Scroll reveals: each timeline item slides/fades in from its own side
  // the first time it enters the viewport. Cleaned up on unmount.
  useEffect(() => {
    const section = sectionRef.current;
    if (prefersReducedMotion || !section) return;

    const ctx = gsap.context(() => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      gsap.utils.toArray("[data-edu-item]", section).forEach((item) => {
        const cards = item.querySelectorAll("[data-edu-card]");
        const fromLeft = item.getAttribute("data-side") === "left";
        const from = { opacity: 0 };
        const to = { opacity: 1 };
        if (desktop) {
          // Alternate: left cards slide in from the left, right cards from the right
          from.x = fromLeft ? -72 : 72;
          to.x = 0;
        } else {
          // Mobile (single column): plain fade-up, no sideways travel
          from.y = 24;
          to.y = 0;
        }
        gsap.fromTo(
          cards,
          from,
          {
            ...to,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCardEnter = (event) => {
    if (prefersReducedMotion) return;
    const card = event.currentTarget;
    const item = card.closest("[data-edu-item]");
    gsap.to(card, { y: -4, scale: 1.02, duration: 0.35, ease: "power2.out" });
    const ring = item?.querySelector("[data-edu-ring]");
    if (ring) gsap.to(ring, { rotation: 15, duration: 0.5, ease: "power2.out" });
  };

  const handleCardLeave = (event) => {
    if (prefersReducedMotion) return;
    const card = event.currentTarget;
    const item = card.closest("[data-edu-item]");
    gsap.to(card, { y: 0, scale: 1, duration: 0.35, ease: "power2.out" });
    const ring = item?.querySelector("[data-edu-ring]");
    if (ring) gsap.to(ring, { rotation: 0, duration: 0.45, ease: "power2.out" });
  };

  const renderCard = (item) => (
    <div data-edu-card className={cardClass} onMouseEnter={handleCardEnter} onMouseLeave={handleCardLeave}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">{item.degree}</h3>
          <p className="text-base mt-1.5" style={{ color: "rgba(163,230,53,0.7)" }}>{item.institution}</p>
        </div>
        <span className="text-sm text-gray-500 whitespace-nowrap">{item.duration}</span>
      </div>
      <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{item.description}</p>
    </div>
  );

  return (
    <section id="education" ref={sectionRef} className="py-24 sm:py-28 lg:py-32">
      <div className="w-full max-w-[80rem] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
        <div data-section-title>
          <SectionTitle title="Education" subtitle="My academic background" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line: centered on desktop, on the left on mobile */}
          <div aria-hidden="true" className="hidden md:block absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
          <div aria-hidden="true" className="md:hidden absolute inset-y-0 left-0 w-px bg-white/10" />

          <div className="space-y-12 md:space-y-16">
            {education.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  data-edu-item
                  data-side={isEven ? "left" : "right"}
                  className="relative"
                >
                  {/* Circular node on the timeline line */}
                  <div
                    aria-hidden="true"
                    className="absolute z-10 top-6 left-0 md:left-1/2 -translate-x-1/2 h-9 w-9 flex items-center justify-center"
                  >
                    <span data-edu-ring className="absolute inset-0 rounded-full border border-dashed border-lime-400/40" />
                    <span className="block h-3.5 w-3.5 rounded-full bg-lime-400" style={{ boxShadow: "0 0 0 4px #050505" }} />
                  </div>

                  {/* Mobile: single column with the line on the left */}
                  <div className="md:hidden pl-10">
                    {renderCard(item)}
                  </div>

                  {/* Desktop: cards alternate left / right of the center line */}
                  <div className="hidden md:grid grid-cols-2 gap-10">
                    {isEven ? renderCard(item) : <div aria-hidden="true" />}
                    {isEven ? <div aria-hidden="true" /> : renderCard(item)}
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

export default Education;
