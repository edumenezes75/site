import { projects } from "@/data/projects";
import IndexCard from "@/components/IndexCard";
import LeadProject from "@/components/LeadProject";

const featured = projects.filter((p) => p.featured);
const lead = featured[0];
const rest = projects.filter((p) => p.slug !== lead?.slug);

export default function ProjectIndex() {
  return (
    <section id="index" className="relative bg-bg text-fg">
      <div className="px-6 md:px-12 pt-16 md:pt-24 pb-8 md:pb-10 flex items-end justify-between">
        <h2 className="font-display text-5xl md:text-8xl leading-[0.95]">
          Selected <span className="italic">Work</span>
        </h2>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/60">
          {projects.length} Projects
        </span>
      </div>

      {lead && <LeadProject project={lead} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-fg/10 border-y border-fg/10">
        {rest.map((p, i) => (
          <IndexCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
