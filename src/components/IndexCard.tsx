"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import { projects, type Project } from "@/data/projects";

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

  return (
    <TransitionLink
      ref={rootRef}
      href={`/projects/${project.slug}`}
      data-cursor="play"
      data-cursor-label={catalogLabel}
      className="group block border-b border-fg/10 transition-colors duration-300"
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
            className="object-cover grayscale sepia-[.42] brightness-[.96] transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-100 group-hover:scale-[1.03] group-data-[inview]:grayscale-0 group-data-[inview]:sepia-0 group-data-[inview]:brightness-100"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 grayscale sepia-[.42] brightness-[.96] transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-100 group-hover:scale-[1.03]"
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
      <div className="px-5 py-5 md:px-6 md:py-6">
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
        <h3 className="mt-2 font-display text-2xl md:text-3xl leading-[1.02] transition-transform duration-300 group-hover:translate-x-0.5">
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
