import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsapConfig";

export function initScrollAnimations(context) {
  if (prefersReducedMotion) return;

  const selector = (sel) => context.querySelectorAll(sel);

  // About section — left/right slide-in
  const aboutLeft = selector("[data-about-left]");
  const aboutRight = selector("[data-about-right]");

  if (aboutLeft.length && aboutRight.length) {
    gsap.fromTo(
      aboutLeft,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutLeft[0].closest("section"),
          start: "top 80%",
          once: true,
        },
      }
    );
    gsap.fromTo(
      aboutRight,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRight[0].closest("section"),
          start: "top 80%",
          once: true,
        },
      }
    );
  }

  // Skills — stagger cards
  const skillCards = selector("[data-skill-card]");
  if (skillCards.length) {
    gsap.fromTo(
      skillCards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: skillCards[0].closest("section"),
          start: "top 80%",
          once: true,
        },
      }
    );
  }

  // Projects — stagger cards
  const projectCards = selector("[data-project-card]");
  if (projectCards.length) {
    gsap.fromTo(
      projectCards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectCards[0].closest("section"),
          start: "top 80%",
          once: true,
        },
      }
    );
  }

  // Experience — timeline cards stagger
  const expCards = selector("[data-exp-card]");
  if (expCards.length) {
    gsap.fromTo(
      expCards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: expCards[0].closest("section"),
          start: "top 80%",
          once: true,
        },
      }
    );
  }

  // Education — stagger cards
  const eduCards = selector("[data-edu-card]");
  if (eduCards.length) {
    gsap.fromTo(
      eduCards,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: eduCards[0].closest("section"),
          start: "top 80%",
          once: true,
        },
      }
    );
  }

  // Achievements — stagger cards
  const achievCards = selector("[data-achiev-card]");
  if (achievCards.length) {
    gsap.fromTo(
      achievCards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: achievCards[0].closest("section"),
          start: "top 80%",
          once: true,
        },
      }
    );
  }

  // Contact — fade up
  const contactSection = selector("[data-contact]");
  if (contactSection.length) {
    gsap.fromTo(
      contactSection,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactSection[0].closest("section"),
          start: "top 80%",
          once: true,
        },
      }
    );
  }

  // Section titles — fade up
  const sectionTitles = selector("[data-section-title]");
  if (sectionTitles.length) {
    gsap.fromTo(
      sectionTitles,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionTitles[0],
          start: "top 85%",
          once: true,
        },
      }
    );
  }
}

export function initHoverAnimations(context) {
  if (prefersReducedMotion) return;

  const projectCards = context.querySelectorAll("[data-project-card]");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.02, duration: 0.3, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  const buttons = context.querySelectorAll("[data-gsap-hover]");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.03, duration: 0.25, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.25, ease: "power2.out" });
    });
  });
}
