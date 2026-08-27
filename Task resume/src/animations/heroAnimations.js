import { gsap, prefersReducedMotion } from "./gsapConfig";

export function initHeroAnimations() {
  if (prefersReducedMotion) {
    // Show everything immediately if reduced motion preferred
    gsap.set(
      [
        "[data-hero-badge]",
        "[data-hero-heading]",
        "[data-hero-role]",
        "[data-hero-intro]",
        "[data-hero-buttons]",
        "[data-hero-social]",
        "[data-hero-visual]",
        "[data-navbar]",
      ],
      { opacity: 1, y: 0, x: 0 }
    );
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Navbar entrance
  tl.fromTo(
    "[data-navbar]",
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    0
  );

  // Badge
  tl.fromTo(
    "[data-hero-badge]",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    0.2
  );

  // Heading
  tl.fromTo(
    "[data-hero-heading]",
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    0.3
  );

  // Role
  tl.fromTo(
    "[data-hero-role]",
    { y: 25, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    0.5
  );

  // Intro
  tl.fromTo(
    "[data-hero-intro]",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    0.65
  );

  // Buttons
  tl.fromTo(
    "[data-hero-buttons]",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    0.8
  );

  // Social links
  tl.fromTo(
    "[data-hero-social]",
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5 },
    0.95
  );

  // Visual element
  tl.fromTo(
    "[data-hero-visual]",
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8 },
    0.5
  );

  return tl;
}
