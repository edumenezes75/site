"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import { projects, type Project } from "@/data/projects";

export default function IndexCard({ project, index }: { project: Project; index: number }) {
  const catalogNo = projects.findIndex((p) => p.slug === project.slug) + 1;
  const catalogLabel = `No. ${String(catalogNo).padStart(2, "0")}`;
  const [videoLoaded, setVideoLoaded] = useState(false);
  const rootRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useCallback((el: HTMLVideoElement | null) => {
    if (el) void el.play().catch(() => {});
  }, []);

  // On touch devices there is no hover — autoplay the preview when the card is
  // in view so the index isn't a wall of static posters, and pause off-screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !project.video) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVideoLoaded(true);
            const v = el.querySelector("video");
            if (v) void v.play().catch(() => {});
          } else {
            const v = el.querySelector("video");
            if (v) v.pause();
          }
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [project.video]);

  const poster = project.video
    ? `/videos/posters/${project.video.replace(/\.mp4$/, ".jpg")}`
    : undefined;
  // Index previews are tiny muted clips (~640px); the full film with audio
  // only loads on the project page, keeping the index light to scroll.
  const previewSrc = project.video ? `/videos/previews/${project.video}` : undefined;

  return (
    <TransitionLink
      ref={rootRef}
      href={`/projects/${project.slug}`}
      data-cursor="play"
      data-cursor-label={catalogLabel}
      className="group block bg-fg/[0.03] border-b border-fg/10 hover:bg-fg/[0.06] transition-colors duration-300"
      onMouseEnter={() => setVideoLoaded(true)}
      onMouseLeave={(e) => {
        const v = (e.currentTarget as HTMLElement).querySelector("video") as HTMLVideoElement | null;
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      }}
    >
      {/* Image / Video area */}
      <div className="relative aspect-video overflow-hidden">
        {poster ? (
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 4}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
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
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* Always-visible play affordance (essential on touch where hover doesn't fire) */}
        {project.video && (
          <span
            aria-hidden
            className="absolute right-3 bottom-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-fg text-xs backdrop-blur-sm transition-colors group-hover:bg-gold group-hover:text-bg"
          >
            ▶
          </span>
        )}

        {project.featured && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-gold/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-bg">
            Selected
          </span>
        )}
      </div>

      {/* Text area */}
      <div className="px-5 py-5 md:px-6 md:py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-fg/55">
              {catalogLabel} / {projects.length}{project.year ? ` · ${project.year}` : ""}
            </span>
            <h3 className="mt-1.5 font-display text-2xl md:text-3xl leading-[1.02] transition-transform duration-300 group-hover:translate-x-0.5">
              {project.title}
            </h3>
            <span className="mt-1 block font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-fg/65">
              {project.client} · {project.agency}
            </span>
            <p className="mt-3 font-mono text-[11px] md:text-xs text-fg/75 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {project.award && (
            <span className="shrink-0 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-gold text-right leading-tight max-w-[120px]">
              {project.award}
            </span>
          )}
        </div>
      </div>
    </TransitionLink>
  );
}
