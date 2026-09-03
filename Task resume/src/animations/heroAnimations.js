import { gsap, prefersReducedMotion } from "./gsapConfig";

const HERO_ELEMENTS = [
  "[data-navbar]",
  "[data-hero-badge]",
  "[data-hero-heading]",
  "[data-hero-role]",
  "[data-hero-intro]",
  "[data-hero-buttons]",
  "[data-hero-social]",
  "[data-hero-visual]",
];

export function initHeroAnimations() {
  // Reduced motion: make sure everything is simply visible.
  if (prefersReducedMotion) {
    gsap.set(HERO_ELEMENTS, { opacity: 1, x: 0, y: 0, scale: 1 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Navbar
  tl.fromTo(
    "[data-navbar]",
    { y: -24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    0
  );

  // Hero badge
  tl.fromTo(
    "[data-hero-badge]",
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5 },
    0.2
  );

  // Hero heading
  tl.fromTo(
    "[data-hero-heading]",
    { y: 32, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    0.35
  );

  // Role / title
  tl.fromTo(
    "[data-hero-role]",
    { y: 22, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    0.55
  );

  // Description
  tl.fromTo(
    "[data-hero-intro]",
    { y: 18, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    0.7
  );

  // CTA buttons
  tl.fromTo(
    "[data-hero-buttons]",
    { y: 18, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.55 },
    0.85
  );

  // Social links
  tl.fromTo(
    "[data-hero-social]",
    { y: 14, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5 },
    0.98
  );

  // Hero visual — last in the sequence
  tl.fromTo(
    "[data-hero-visual]",
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8 },
    1.08
  );

  return tl;
}
