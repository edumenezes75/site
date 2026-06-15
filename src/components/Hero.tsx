"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

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
    track("watch_showreel");
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
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
        src={heroVideo}
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      {/* Calm scrim — the reel is ambient texture; the title floats clearly above it */}
      <div className="absolute inset-0 -z-10 bg-bg/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/45 to-bg/20" />

      <div className="flex-1 flex flex-col justify-center gap-8 md:gap-10 px-6 md:px-12">
        <h1
          ref={titleRef}
          className="font-display text-[15vw] md:text-[10.5vw] leading-[0.95] tracking-[-0.01em] py-[0.05em]"
        >
          <span className="block">
            <SplitWord text="Edu" />
          </span>
          <span className="block italic">
            <SplitWord text="Menezes" />
          </span>
        </h1>

        <p className="max-w-2xl font-display text-xl md:text-3xl text-fg/85 leading-snug">
          Motion design and editing for film and advertising.
        </p>

        <div className="flex flex-wrap items-center gap-4">
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
            Watch the reel — 1:44
          </button>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/60">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            Available for select projects, worldwide
          </span>
        </div>
      </div>
    </section>
  );
}
