"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }

    // IntersectionObserver drives the reveal — reliable regardless of the
    // smooth-scroll layer, and it can never trap content invisible (a safety
    // timeout reveals anything still hidden, e.g. if the observer never fires).
    gsap.set(el, { y: 60, opacity: 0 });
    const reveal = () =>
      gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);

    const safety = window.setTimeout(() => {
      gsap.set(el, { y: 0, opacity: 1 });
      io.disconnect();
    }, 4000);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
