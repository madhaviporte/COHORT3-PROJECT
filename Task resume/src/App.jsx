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

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    if (!appRef.current) return;

    const ctx = gsap.context(() => {
      initHeroAnimations();
      initScrollAnimations(appRef.current);
      initHoverAnimations(appRef.current);
    }, appRef);

    return () => ctx.revert();
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
