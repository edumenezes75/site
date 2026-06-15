"use client";

import { useEffect, useRef } from "react";
import TransitionLink from "@/components/TransitionLink";
import { projects, type Project } from "@/data/projects";
import { useScrollReveal } from "@/lib/useScrollReveal";

// The lead project: a full-bleed, living hero. The film plays clean (its own
// on-screen text isn't fought by an overlay); the project info sits below it.
export default function LeadProject({ project }: { project: Project }) {
  const catalogNo = projects.findIndex((p) => p.slug === project.slug) + 1;
  const poster = project.video
    ? `/videos/posters/${project.video.replace(/\.mp4$/, ".jpg")}`
    : undefined;
  const previewSrc = project.video ? `/videos/previews/${project.video}` : undefined;

  const videoElRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoElRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const revealRef = useScrollReveal<HTMLAnchorElement>();

  return (
    <TransitionLink
      ref={revealRef}
      href={`/projects/${project.slug}`}
      data-cursor="play"
      data-cursor-label={`No. ${String(catalogNo).padStart(2, "0")}`}
      className="group block w-full border-y border-fg/10"
    >
      <div className="relative aspect-[16/10] md:aspect-[2.4/1] w-full overflow-hidden">
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {previewSrc && (
          <video
            ref={videoElRef}
            aria-hidden
            muted
            loop
            playsInline
            preload="none"
            src={previewSrc}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:opacity-100"
          />
        )}
      </div>

      {/* Info below the film — no text fighting the film's own on-screen text */}
      <div className="px-6 md:px-12 py-8 md:py-10 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-3xl">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold">
            Featured · No. {String(catalogNo).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-display text-4xl md:text-6xl leading-[0.98]">
            {project.title}
          </h3>
          <p className="mt-3 font-display text-lg md:text-2xl text-fg/70 leading-snug">
            {project.overview}
          </p>
        </div>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/55 md:text-right">
          {project.client} · {project.agency}
          {project.year ? ` · ${project.year}` : ""}
        </span>
      </div>
    </TransitionLink>
  );
}
