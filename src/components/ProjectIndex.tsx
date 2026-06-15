import { projects } from "@/data/projects";
import IndexCard from "@/components/IndexCard";
import LeadProject from "@/components/LeadProject";
import TransitionLink from "@/components/TransitionLink";

const featured = projects.filter((p) => p.featured);
const lead = featured[0];
const restFeatured = featured.slice(1);
const archive = projects.filter((p) => !p.featured);

export default function ProjectIndex() {
  return (
    <section id="index" className="relative bg-bg text-fg">
      {/* Selected — the curated few, big */}
      <div className="px-6 md:px-12 pt-16 md:pt-24 pb-8 md:pb-10 flex items-end justify-between">
        <h2 className="font-display text-5xl md:text-8xl leading-[0.95]">
          Selected <span className="italic">Work</span>
        </h2>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/60">
          {featured.length} Highlights
        </span>
      </div>

      {lead && <LeadProject project={lead} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-fg/10 border-y border-fg/10">
        {restFeatured.map((p, i) => (
          <IndexCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      {/* Archive — the rest, light and scannable */}
      <div className="px-6 md:px-12 pt-20 md:pt-28 pb-6 flex items-end justify-between">
        <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">Archive</h2>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/60">
          {archive.length} Projects
        </span>
      </div>

      <ul className="px-6 md:px-12 pb-16 md:pb-24 divide-y divide-fg/10 border-t border-fg/10">
        {archive.map((p) => {
          const no = projects.findIndex((x) => x.slug === p.slug) + 1;
          return (
            <li key={p.slug}>
              <TransitionLink
                href={`/projects/${p.slug}`}
                data-cursor="play"
                data-cursor-label={`No. ${String(no).padStart(2, "0")}`}
                className="group grid grid-cols-[40px_1fr] md:grid-cols-[60px_1.6fr_1fr_1fr] items-center gap-x-4 md:gap-x-8 gap-y-1 py-5 md:py-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/45">
                  {String(no).padStart(2, "0")}
                </span>
                <span className="font-display text-xl md:text-2xl transition-colors group-hover:text-gold">
                  {p.title}
                </span>
                <span className="col-start-2 md:col-start-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/60">
                  {p.client}
                </span>
                <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.2em] text-fg/45">
                  {p.agency}
                </span>
              </TransitionLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
