"use client";

import { useMemo, useState } from "react";
import { projects, disciplinesOf, DISCIPLINES, type Discipline } from "@/data/projects";
import IndexCard from "@/components/IndexCard";

type Filter = "All" | Discipline;
const FILTERS: Filter[] = ["All", ...DISCIPLINES];

const featured = projects.filter((p) => p.featured);

export default function ProjectIndex() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => disciplinesOf(p).includes(filter)),
    [filter]
  );

  return (
    <section id="index" className="relative bg-bg text-fg">
      {/* Selected Work */}
      <div className="px-6 md:px-12 pt-16 md:pt-24 pb-8 md:pb-10 flex items-end justify-between">
        <h2 className="font-display font-medium text-4xl md:text-7xl uppercase">Selected Work</h2>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/60">
          {featured.length} Highlights
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-fg/10 border-y border-fg/10">
        {featured.map((p, i) => (
          <IndexCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      {/* All Work + discipline filter */}
      <div className="px-6 md:px-12 pt-20 md:pt-28 pb-8 md:pb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display font-medium text-4xl md:text-7xl uppercase">All Work</h2>
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              data-cursor="link"
              data-cursor-label={f}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] transition-colors ${
                filter === f
                  ? "border-gold bg-gold text-bg"
                  : "border-fg/25 text-fg/70 hover:border-fg/60 hover:text-fg"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="px-6 md:px-12 pb-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/55">
        {filtered.length} {filtered.length === 1 ? "Project" : "Projects"} — Timeline View
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-fg/10 border-t border-fg/10">
        {filtered.map((p, i) => (
          <IndexCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
