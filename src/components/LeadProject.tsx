"use client";

import { useEffect, useRef } from "react";
import TransitionLink from "@/components/TransitionLink";
import { projects, type Project } from "@/data/projects";

// The lead project: a full-bleed, living hero that auto-plays its highlight —
// gives the index a focal point and answers "a motion site shouldn't be static".
export default function LeadProject({ project }: { project: Project }) {
  const catalogNo = projects.findIndex((p) => p.slug === project.slug) + 1;
  const poster = project.video
    ? `/videos/posters/${project.video.replace(/\.mp4$/, ".jpg")}`
    : undefined;
  const previewSrc = project.video ? `/videos/previews/${project.video}` : undefined;

  // Play the highlight only while the lead is on screen — keeps it "living"
  // without competing with the hero for the initial page load.
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

  return (
    <TransitionLink
      href={`/projects/${project.slug}`}
      data-cursor="play"
      data-cursor-label={`No. ${String(catalogNo).padStart(2, "0")}`}
      className="group relative block w-full overflow-hidden border-y border-fg/10"
    >
      <div className="relative aspect-[16/10] md:aspect-[21/9] w-full">
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt={project.title}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-10">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-gold">
            Featured · No. {String(catalogNo).padStart(2, "0")}
          </span>
          <h3 className="font-display text-5xl md:text-8xl leading-[0.92] max-w-4xl">
            {project.title}
          </h3>
          <p className="font-display text-lg md:text-2xl text-fg/85 leading-snug max-w-2xl">
            {project.overview}
          </p>
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/60">
            {project.client} · {project.agency}
            {project.year ? ` · ${project.year}` : ""}
            {project.duration ? ` · ${project.duration}` : ""}
            {project.award ? ` · ` : ""}
            {project.award && <span className="text-gold">{project.award}</span>}
          </span>
        </div>
      </div>
    </TransitionLink>
  );
}
