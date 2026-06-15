import { projects } from "@/data/projects";
import IndexCard from "@/components/IndexCard";

export default function ProjectIndex() {
  return (
    <section id="index" className="relative bg-bg text-fg">
      <div className="px-6 md:px-12 py-12 md:py-16 flex items-end justify-between border-b border-fg/10">
        <h2 className="font-display font-medium text-4xl md:text-7xl uppercase">Index</h2>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/40">
          {projects.length} Projects — Timeline View
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-fg/10">
        {projects.map((p, i) => (
          <IndexCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
