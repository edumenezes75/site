"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirst = useRef(true);

  // Reveal on initial page load
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    gsap.set(el, { y: "0%" });
    gsap.to(el, {
      y: "-100%",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => gsap.set(el, { y: "100%" }),
    });
  }, []);

  // Reveal after each client-side navigation
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const el = overlayRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { y: "0%" },
      {
        y: "-100%",
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => gsap.set(el, { y: "100%" }),
      }
    );
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      id="page-transition-overlay"
      aria-hidden
      className="fixed inset-0 z-[100] bg-bg pointer-events-none"
    />
  );
}
