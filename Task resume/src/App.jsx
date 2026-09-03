import { useEffect, useRef } from "react";
import { gsap } from "./animations/gsapConfig";
import { initHeroAnimations } from "./animations/heroAnimations";
import {
  initScrollAnimations,
  initHoverAnimations,
} from "./animations/scrollAnimations";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Achievements from "./sections/Achievments";
import Contact from "./sections/Contact";

// Everything GSAP may put into a hidden state. Used as a safety net so the
// page can never remain invisible if animation setup fails.
const ANIMATED_SELECTORS = [
  "[data-navbar]",
  "[data-hero-badge]",
  "[data-hero-heading]",
  "[data-hero-role]",
  "[data-hero-intro]",
  "[data-hero-buttons]",
  "[data-hero-social]",
  "[data-hero-visual]",
  "[data-section-title]",
  "[data-about-left]",
  "[data-about-right]",
  "[data-skill-card]",
  "[data-project-card]",
  "[data-exp-card]",
  "[data-edu-card]",
  "[data-achiev-card]",
  "[data-contact]",
].join(",");

function revealAllContent(root) {
  root.querySelectorAll(ANIMATED_SELECTORS).forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "";
  });
}

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    const root = appRef.current;
    if (!root) return;

    let ctx;
    let removeHoverListeners;

    try {
      ctx = gsap.context(() => {
        initHeroAnimations();
        initScrollAnimations(root);
        removeHoverListeners = initHoverAnimations(root);
      }, appRef);
    } catch (error) {
      // GSAP failed part-way: reveal everything so the site stays usable.
      console.error("[portfolio] GSAP setup failed, showing all content.", error);
      revealAllContent(root);
    }

    return () => {
      ctx?.revert();
      removeHoverListeners?.();
    };
  }, []);

  return (
    <div ref={appRef} className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
