"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import type { Project } from "@/data/projects";

export default function IndexCard({ project, index }: { project: Project; index: number }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useCallback((el: HTMLVideoElement | null) => {
    if (el) void el.play().catch(() => {});
  }, []);

  const poster = project.video
    ? `/videos/posters/${project.video.replace(/\.mp4$/, ".jpg")}`
    : undefined;

  return (
    <TransitionLink
      href={`/projects/${project.slug}`}
      data-cursor="play"
      data-cursor-label={project.timecode}
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
            src={`/videos/${project.video}`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>

      {/* Text area */}
      <div className="px-5 py-5 md:px-6 md:py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-fg/35">
              {project.timecode}{project.year ? ` · ${project.year}` : ""}
            </span>
            <h3 className="mt-1.5 font-display font-medium text-xl md:text-2xl uppercase leading-[1.05] transition-transform duration-300 group-hover:translate-x-0.5">
              {project.title}
            </h3>
            <span className="mt-1 block font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-fg/45">
              {project.client} · {project.agency}
            </span>
            <p className="mt-3 font-mono text-[11px] md:text-xs text-fg/55 leading-relaxed">
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
