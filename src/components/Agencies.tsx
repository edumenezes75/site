// International-forward credibility strip — the agencies and brands speak before
// the work does. Global shops listed first to signal worldwide caliber.
const agencies = [
  "Wieden+Kennedy",
  "BBH New York",
  "FCB Chicago",
  "Ogilvy New York",
  "GUT Miami",
  "R/GA",
  "AlmapBBDO",
  "Publicis",
  "Africa Creative DDB",
  "DM9",
  "Grey",
  "CP+B",
];

const brands = [
  "Google", "Adidas", "Budweiser", "Nike", "Gatorade", "Heinz",
  "Corona", "Vivo", "Itaú", "UNESCO", "Activision", "Havaianas",
];

export default function Agencies() {
  return (
    <section className="bg-bg text-fg px-6 md:px-12 py-20 md:py-28 border-t border-fg/10">
      <div className="grid gap-16 md:grid-cols-[160px_1fr] md:gap-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/50">
          Agencies
        </span>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 font-display text-2xl md:text-4xl text-fg/85 leading-tight">
          {agencies.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="mt-14 md:mt-20 grid gap-16 md:grid-cols-[160px_1fr] md:gap-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/50">
          Brands
        </span>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs md:text-sm uppercase tracking-[0.15em] text-fg/60">
          {brands.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
