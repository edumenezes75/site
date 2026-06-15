// International-forward credibility — agencies and brands. Label on top, names
// full-width so they wrap evenly; sized as a quiet list, not a headline.
const agencies = [
  "Wieden+Kennedy", "BBH New York", "FCB Chicago", "Ogilvy New York", "GUT Miami",
  "R/GA", "AlmapBBDO", "Publicis", "Africa Creative DDB", "DM9", "Grey", "CP+B",
];

const brands = [
  "Google", "Adidas", "Budweiser", "Nike", "Gatorade", "Heinz",
  "Corona", "Vivo", "Itaú", "UNESCO", "Activision", "Havaianas",
];

export default function Agencies() {
  return (
    <section className="bg-bg text-fg px-6 md:px-12 py-20 md:py-28 border-t border-fg/10">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/50">Agencies</h3>
      <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-2 font-display text-2xl md:text-[2rem] leading-[1.15] text-fg/85">
        {agencies.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>

      <h3 className="mt-14 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/50">Brands</h3>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-fg/55">
        {brands.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </section>
  );
}
