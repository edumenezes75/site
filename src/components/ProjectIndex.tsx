"use client";

import { useMemo, useState } from "react";
import { projects, disciplinesOf, DISCIPLINES, type Discipline } from "@/data/projects";
import IndexCard from "@/components/IndexCard";
import LeadProject from "@/components/LeadProject";

type Filter = "All" | Discipline;
const FILTERS: Filter[] = ["All", ...DISCIPLINES];

const featured = projects.filter((p) => p.featured);
const lead = featured[0];

export default function ProjectIndex() {
  const [filter, setFilter] = useState<Filter>("All");

  // No duplication: on "All" the lead is the full-bleed hero and the grid
  // shows everything else. On a discipline filter the hero steps aside and the
  // grid shows the complete matching set (lead included if it matches).
  const showLead = filter === "All";
  const gridProjects = useMemo(() => {
    if (filter === "All") return projects.filter((p) => p.slug !== lead?.slug);
    return projects.filter((p) => disciplinesOf(p).includes(filter));
  }, [filter]);

  return (
    <section id="index" className="relative bg-bg text-fg">
      <div className="px-6 md:px-12 pt-16 md:pt-24 pb-8 md:pb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-5xl md:text-8xl leading-[0.95]">
          {filter === "All" ? <>Selected <span className="italic">Work</span></> : <>{filter}</>}
        </h2>
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

      {showLead && lead && <LeadProject project={lead} />}

      <div className="px-6 md:px-12 py-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/60">
        {showLead
          ? `+ ${gridProjects.length} more`
          : `${gridProjects.length} ${gridProjects.length === 1 ? "project" : "projects"}`}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-fg/10 border-y border-fg/10">
        {gridProjects.map((p, i) => (
          <IndexCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
