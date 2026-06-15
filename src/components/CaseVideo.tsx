"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type CaseVideoProps = {
  video?: string;
  hue: number;
  title: string;
  scrub?: boolean;
  hasFilm?: boolean;
};

export default function CaseVideo({ video, hue, title, scrub, hasFilm }: CaseVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onChange = () => setFullscreen(document.fullscreenElement === el);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    if (!scrub) return;
    const el = videoRef.current;
    if (!el) return;

    // With reduced motion, scrubbing on scroll is disorienting and a frozen
    // frame looks broken — fall back to a gentle muted autoplay loop instead.
    if (prefersReducedMotion()) {
      el.muted = true;
      el.loop = true;
      void el.play().catch(() => {});
      return;
    }

    el.pause();

    let trigger: ScrollTrigger | undefined;
    const setup = () => {
      trigger = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (el.duration) {
            el.currentTime = self.progress * el.duration;
          }
        },
      });
    };

    if (el.readyState >= 1) {
      setup();
    } else {
      el.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      el.removeEventListener("loadedmetadata", setup);
      trigger?.kill();
    };
  }, [scrub]);

  if (!video) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 70% 45%), hsl(${hue + 40} 70% 10%))`,
        }}
      />
    );
  }

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    if (muted) {
      el.muted = false;
      el.currentTime = 0;
      void el.play();
      setMuted(false);
    } else {
      el.muted = true;
      setMuted(true);
    }
  };

  const watchFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.currentTime = 0;
    setMuted(false);
    void el.play();
    void el.requestFullscreen?.();
  };

  const posterUrl = `/videos/posters/${video.replace(/\.mp4$/, ".jpg")}`;

  // If the video fails to load, fall back to the poster (never a black void).
  if (failed) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={posterUrl} alt={title} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        {!scrub && (
          <span className="absolute bottom-8 right-6 md:right-12 z-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/50">
            Preview unavailable
          </span>
        )}
      </>
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src={`/videos/${video}`}
        poster={posterUrl}
        autoPlay={!scrub}
        loop={!scrub}
        muted={muted}
        controls={fullscreen}
        playsInline
        preload={scrub ? "auto" : undefined}
        aria-label={`${title} — reel`}
        onError={() => setFailed(true)}
      />
      {!scrub && hasFilm && (
        <div className="absolute bottom-8 right-6 md:right-12 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Watch with sound" : "Mute"}
            className="flex items-center gap-2 rounded-full border border-fg/20 bg-black/40 px-4 py-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
          >
            {muted ? "▶ Watch with sound" : "Mute"}
          </button>
          <button
            type="button"
            onClick={watchFullscreen}
            aria-label="Watch fullscreen"
            className="flex items-center gap-2 rounded-full border border-fg/20 bg-black/40 px-4 py-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
          >
            Fullscreen
          </button>
        </div>
      )}
      {!scrub && !hasFilm && (
        <span className="absolute bottom-8 right-6 md:right-12 z-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/50">
          Preview
        </span>
      )}
    </>
  );
}
