import { projects } from "@/data/projects";

export default function Awards() {
  const awarded = projects.filter((p) => p.award);

  return (
    <section id="awards" className="relative bg-bg text-fg px-6 md:px-12 py-16 md:py-24 border-t border-fg/10">
      <div className="mb-12 md:mb-16 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-5xl md:text-8xl">Awards</h2>
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/55">
          8 Cannes Lions · El Ojo · Effie · D&amp;AD
        </span>
      </div>

      <ul className="font-mono text-xs md:text-base divide-y divide-fg/10">
        {awarded.map((p) => (
          <li
            key={p.slug}
            className="grid grid-cols-[1fr_auto] md:grid-cols-3 items-center gap-2 py-4 uppercase tracking-wide"
          >
            <span className="text-fg/90">{p.title}</span>
            <span className="hidden md:block text-fg/60">{p.client}</span>
            <span className="text-right text-gold">{p.award}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
