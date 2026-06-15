"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { projects, TOTAL_CANNES_LIONS } from "@/data/projects";

export default function Awards() {
  const numberRef = useRef<HTMLSpanElement>(null);
  const awarded = projects.filter((p) => p.award);

  useEffect(() => {
    if (!numberRef.current) return;
    const el = numberRef.current;
    if (prefersReducedMotion()) {
      el.textContent = TOTAL_CANNES_LIONS.toString();
      return;
    }
    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: TOTAL_CANNES_LIONS,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.round(counter.val).toString();
        },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="awards" className="relative bg-bg text-fg px-6 md:px-12 py-16 md:py-24 border-t border-fg/10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <h2 className="font-display text-5xl md:text-8xl">Awards</h2>
        <div className="font-mono flex items-baseline gap-3">
          <span ref={numberRef} className="font-display font-medium text-5xl md:text-8xl text-gold">
            0
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/60">
            Cannes Lions
          </span>
        </div>
      </div>

      <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/55">
        Full record — Cannes Lions, El Ojo, Effie, D&amp;AD and more
      </p>
      <ul className="font-mono text-xs md:text-base divide-y divide-fg/10">
        {awarded.map((p) => (
          <li
            key={p.slug}
            className="grid grid-cols-[1fr_auto] md:grid-cols-3 items-center gap-2 py-4 uppercase tracking-wide"
          >
            <span className="text-fg/90">{p.title}</span>
            <span className="hidden md:block text-fg/60">{p.client}</span>
            <span className="text-right text-gold">{p.award}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
