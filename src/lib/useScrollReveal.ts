import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./motion";

// Reveal an element on scroll-in via IntersectionObserver. Robust by design:
// nothing is hidden without JS, reduced-motion skips it entirely, and a safety
// timeout guarantees content can never get trapped invisible.
export function useScrollReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ease = "cubic-bezier(.16,1,.3,1)";
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity .8s ${ease} ${delayMs}ms, transform .8s ${ease} ${delayMs}ms`;
    const reveal = () => {
      el.style.opacity = "1";
      el.style.transform = "none";
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    const t = window.setTimeout(() => {
      reveal();
      io.disconnect();
    }, 4000);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [delayMs]);
  return ref;
}
