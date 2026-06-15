"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { formatTimecode } from "@/lib/timecode";

function SplitWord({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span className="inline-block overflow-hidden" key={i}>
          <span className="char inline-block will-change-transform">
            {char === " " ? " " : char}
          </span>
        </span>
      ))}
    </>
  );
}

// Light, muted 720p loop for the autoplay background; the full 1080p reel
// with audio is swapped in only when the visitor hits "Watch Showreel".
const heroVideo = "/videos/reel-bg.mp4";
const heroFullReel = "/videos/reel.mp4";
const heroPoster = "/videos/posters/reel.jpg";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);

  // Live timecode that runs off the showreel's real playhead.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      const el = tcRef.current;
      if (v && el) el.textContent = formatTimecode(v.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".char");
    if (prefersReducedMotion()) {
      gsap.set(chars, { yPercent: 0, opacity: 1 });
      return;
    }
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

  const watchReel = () => {
    const el = videoRef.current;
    if (!el) return;
    // Swap the light background loop for the full reel with audio.
    if (!el.src.includes(heroFullReel)) {
      el.src = heroFullReel;
      el.load();
    }
    el.muted = false;
    el.currentTime = 0;
    void el.play();
    void el.requestFullscreen?.();
  };

  return (
    <section className="relative isolate h-screen w-full flex flex-col justify-between overflow-hidden bg-bg text-fg">
      <video
        ref={videoRef}
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

      <div className="flex-1 flex flex-col justify-center gap-8 px-6 md:px-12">
        <h1
          ref={titleRef}
          className="font-display text-[17vw] md:text-[12vw] leading-[0.82] tracking-[-0.01em]"
        >
          <span className="block">
            <SplitWord text="Edu" />
          </span>
          <span className="block italic">
            <SplitWord text="Menezes" />
          </span>
        </h1>

        <button
          type="button"
          onClick={watchReel}
          data-cursor="play"
          data-cursor-label="Play reel"
          className="group inline-flex w-fit items-center gap-3 rounded-full border border-fg/25 bg-black/30 px-5 py-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-fg backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-bg transition-transform group-hover:scale-110">
            ▶
          </span>
          Watch Showreel — 1:44
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 px-6 md:px-12 pb-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/65">
        <span>Director — Motion Design — Edit</span>
        <span className="hidden sm:inline-flex items-center gap-2 text-gold/90 tabular-nums normal-case tracking-[0.1em]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold motion-safe:animate-pulse" />
          <span ref={tcRef}>00:00:00:00</span>
        </span>
        <span>Showreel 2025 · 8 Cannes Lions</span>
      </div>
    </section>
  );
}
