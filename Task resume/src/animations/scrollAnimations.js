import { gsap, prefersReducedMotion } from "./gsapConfig";

const EASE = "power3.out";
const SCROLL_START = "top 80%";

// Smaller travel distances on narrow screens (stacked layouts) so the
// reveals stay subtle and never push content outside the viewport.
const aboutOffset = () =>
  window.matchMedia("(max-width: 1023px)").matches ? 20 : 40;

function sectionOf(element) {
  return element && element.closest ? element.closest("section") : null;
}

/**
 * One ScrollTrigger per animated group. Elements fade up (opacity + y)
 * the first time their section enters the viewport and never replay.
 */
function fadeUp(elements, { y = 30, duration = 0.7, stagger = 0, trigger } = {}) {
  const targets =
    elements && typeof elements.length === "number"
      ? Array.from(elements)
      : [elements];
  if (!targets.length || !targets[0]) return;

  const target = trigger || sectionOf(targets[0]);
  if (!target) return;

  gsap.fromTo(
    targets,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: EASE,
      scrollTrigger: {
        trigger: target,
        start: SCROLL_START,
        once: true,
      },
    }
  );
}

export function initScrollAnimations(context) {
  if (prefersReducedMotion || !context) return;

  const selector = (sel) => context.querySelectorAll(sel);

  // Section titles — each title reveals when its own section arrives.
  selector("[data-section-title]").forEach((title) =>
    fadeUp(title, { y: 20, duration: 0.55 })
  );

  // About — subtle two-sided reveal: left column (image) slides from the
  // left, right column (text) from the right, keeping movement small.
  const aboutLeft = selector("[data-about-left]");
  const aboutRight = selector("[data-about-right]");
  const aboutSection = sectionOf(aboutLeft[0]) || sectionOf(aboutRight[0]);
  if (aboutLeft.length && aboutRight.length && aboutSection) {
    const distance = aboutOffset();
    const options = {
      duration: 0.8,
      ease: EASE,
      scrollTrigger: {
        trigger: aboutSection,
        start: SCROLL_START,
        once: true,
      },
    };
    gsap.fromTo(aboutLeft, { x: -distance, opacity: 0 }, { x: 0, opacity: 1, ...options });
    gsap.fromTo(aboutRight, { x: distance, opacity: 0 }, { x: 0, opacity: 1, ...options });
  }

  // Skills — card stagger
  const skillCards = selector("[data-skill-card]");
  if (skillCards.length) {
    fadeUp(skillCards, { y: 30, duration: 0.6, stagger: 0.1 });
  }

  // Projects — card stagger (vertical only)
  const projectCards = selector("[data-project-card]");
  if (projectCards.length) {
    fadeUp(projectCards, { y: 40, duration: 0.7, stagger: 0.12 });
  }

  // Experience — timeline card stagger
  const expCards = selector("[data-exp-card]");
  if (expCards.length) {
    fadeUp(expCards, { y: 30, duration: 0.65, stagger: 0.15 });
  }

  // Education — card stagger
  const eduCards = selector("[data-edu-card]");
  if (eduCards.length) {
    fadeUp(eduCards, { y: 25, duration: 0.6, stagger: 0.1 });
  }

  // Achievements — card stagger
  const achievCards = selector("[data-achiev-card]");
  if (achievCards.length) {
    fadeUp(achievCards, { y: 30, duration: 0.6, stagger: 0.1 });
  }

  // Contact — single simple fade-up
  const contactBlock = selector("[data-contact]");
  if (contactBlock.length) {
    fadeUp(contactBlock, { y: 30, duration: 0.8 });
  }
}

/**
 * Subtle GSAP hover scaling. Returns a cleanup function that removes the
 * listeners so React unmount / StrictMode remounts never duplicate them.
 */
export function initHoverAnimations(context) {
  const cleanups = [];

  if (prefersReducedMotion || !context) {
    return () => cleanups.forEach((remove) => remove());
  }

  const attachScaleHover = (elements, scaleTo) => {
    elements.forEach((el) => {
      const enter = () =>
        gsap.to(el, { scale: scaleTo, duration: 0.3, ease: "power2.out" });
      const leave = () =>
        gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    });
  };

  attachScaleHover(context.querySelectorAll("[data-project-card]"), 1.02);
  attachScaleHover(context.querySelectorAll("[data-gsap-hover]"), 1.03);

  return () => cleanups.forEach((remove) => remove());
}
