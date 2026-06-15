// Shared reduced-motion helper. Returns true when the user asked the OS to
// minimize animation, so callers can skip GSAP tweens, smooth scroll and autoplay.
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
