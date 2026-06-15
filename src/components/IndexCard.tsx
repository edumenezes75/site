"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import { projects, type Project } from "@/data/projects";
import { prefersReducedMotion } from "@/lib/motion";

export default function IndexCard({ project, index }: { project: Project; index: number }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const rootRef = useRef<HTMLAnchorElement>(null);

  const videoRef = useCallback((el: HTMLVideoElement | null) => {
    if (el) void el.play().catch(() => {});
  }, []);

  const catalogNo = projects.findIndex((p) => p.slug === project.slug) + 1;
  const catalogLabel = `No. ${String(catalogNo).padStart(2, "0")}`;

  const poster = project.video
    ? `/videos/posters/${project.video.replace(/\.mp4$/, ".jpg")}`
    : undefined;
  const previewSrc = project.video ? `/videos/previews/${project.video}` : undefined;

  // Touch devices: autoplay the highlight in view (and show it in colour).
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !project.video) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = el.querySelector("video");
          if (e.isIntersecting) {
            setVideoLoaded(true);
            el.dataset.inview = "1";
            if (v) void v.play().catch(() => {});
          } else {
            delete el.dataset.inview;
            if (v) v.pause();
          }
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [project.video]);

  // Scroll-reveal entrance (staggered by column) — makes the index feel alive
  // as you scroll. Robust: reduced-motion skips it, safety timeout un-hides.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;
    const delay = (index % 2) * 90;
    const ease = "cubic-bezier(.16,1,.3,1)";
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity .8s ${ease} ${delay}ms, transform .8s ${ease} ${delay}ms`;
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
  }, [index]);

  return (
    <TransitionLink
      ref={rootRef}
      href={`/projects/${project.slug}`}
      data-cursor="play"
      data-cursor-label={catalogLabel}
      className="group block bg-bg border-b border-fg/10"
      onMouseEnter={() => setVideoLoaded(true)}
      onMouseLeave={(e) => {
        const v = (e.currentTarget as HTMLElement).querySelector("video") as HTMLVideoElement | null;
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      }}
    >
      {/* Thumbnail — monochrome by default, colour on hover/in-view: one system,
          and the colour return is the motion. */}
      <div className="relative aspect-video overflow-hidden">
        {poster ? (
          <Image
            src={poster}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 3}
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, hsl(${project.hue} 70% 45%), hsl(${project.hue + 40} 70% 12%))`,
            }}
          />
        )}

        {videoLoaded && project.video && (
          <video
            ref={videoRef}
            aria-hidden
            muted
            loop
            playsInline
            preload="none"
            src={previewSrc}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-data-[inview]:opacity-100"
          />
        )}
      </div>

      {/* Text — two voices only: a quiet mono meta line and a serif title. */}
      <div className="px-5 py-6 md:px-7 md:py-8">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-fg/60">
            {catalogLabel}
            {project.year ? ` · ${project.year}` : ""}
            {project.duration ? ` · ${project.duration}` : ""}
          </span>
          {project.award && (
            <span className="shrink-0 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-gold text-right">
              {project.award}
            </span>
          )}
        </div>
        <h3 className="mt-2 font-display text-2xl md:text-3xl leading-[1.05]">
          {project.title}
        </h3>
        <p className="mt-2 font-display text-base md:text-lg text-fg/70 leading-snug">
          {project.overview}
        </p>
        <span className="mt-3 block font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-fg/60">
          {project.client} · {project.agency}
        </span>
      </div>
    </TransitionLink>
  );
}
