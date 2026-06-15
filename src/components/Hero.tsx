"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

function SplitWord({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span className="inline-block overflow-hidden" key={i}>
          <span className="char inline-block will-change-transform">
            {char === " " ? " " : char}
          </span>
        </span>
      ))}
    </>
  );
}

const heroVideo = "/videos/reel.mp4";
const heroPoster = "/videos/posters/reel.jpg";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.025,
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section className="relative isolate h-screen w-full flex flex-col justify-between overflow-hidden bg-bg text-fg">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60"
        src={heroVideo}
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/40 via-bg/70 to-bg" />

      <div className="flex-1 flex items-center px-6 md:px-12">
        <h1
          ref={titleRef}
          className="font-display font-medium text-[16vw] md:text-[11vw] leading-[0.85] tracking-tight uppercase"
        >
          <span className="block">
            <SplitWord text="EDU" />
          </span>
          <span className="block">
            <SplitWord text="MENEZES" />
          </span>
        </h1>
      </div>

      <div className="flex items-center justify-between px-6 md:px-12 pb-8 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/50">
        <span>Director — Motion Design — Edit</span>
        <span>Showreel 2025 · 8 Cannes Lions</span>
      </div>

      <div className="h-10 w-full border-t border-fg/10 flex">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex-1 border-r border-fg/10 last:border-r-0 relative">
            <span className="absolute left-1.5 bottom-1.5 font-mono text-[9px] text-fg/30">
              {String(i).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
