import ContactButton from "@/components/ContactButton";
import { EMAIL } from "@/lib/contact";

export default function Footer() {
  return (
    <footer
      id="about"
      className="bg-bg text-fg px-6 md:px-12 py-20 md:py-32 border-t border-fg/10"
    >
      {/* About */}
      <div className="max-w-3xl">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/50 mb-6">About</h2>
        <p className="font-display text-3xl md:text-5xl text-fg/90 leading-tight">
          I chase the cut that makes you feel something before you understand it.
        </p>
        <p className="mt-8 font-display text-lg md:text-2xl text-fg/65 leading-snug">
          Motion designer and editor — 20+ years across advertising, film and
          documentary. I&apos;ve worked with agencies in Brazil and worldwide —
          Wieden+Kennedy, GUT, Ogilvy, R/GA, AlmapBBDO, and U.S. shops like FCB
          Chicago and BBH New York — and spent years at O2 Filmes alongside
          directors such as Fernando Meirelles. Lately I led motion, VFX and titles
          on <span className="italic">Bituca</span>, the Milton Nascimento
          documentary that ran in cinemas and on TV Globo. Recognized at Cannes
          Lions, El Ojo and D&amp;AD.
        </p>
      </div>

      {/* Contact */}
      <div className="mt-20 md:mt-28 border-t border-fg/10 pt-12 md:pt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/55 mb-5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            Available for select projects, worldwide
          </span>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
            Have a brief? <span className="italic">Send it over.</span>
          </h2>
          <div className="mt-7 flex flex-wrap items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/60">
            <a href={`mailto:${EMAIL}`} data-cursor="link" data-cursor-label="Email" className="hover:text-gold transition-colors">
              {EMAIL}
            </a>
            <a href="https://www.linkedin.com/in/edumenezesmotion/" target="_blank" rel="noopener noreferrer" data-cursor="link" data-cursor-label="Open" className="hover:text-gold transition-colors">
              LinkedIn ↗
            </a>
            <a href="https://vimeo.com/edumenezes" target="_blank" rel="noopener noreferrer" data-cursor="link" data-cursor-label="Open" className="hover:text-gold transition-colors">
              Vimeo ↗
            </a>
          </div>
        </div>

        <ContactButton
          location="footer"
          cursorLabel="Email"
          className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-gold px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85"
        >
          Send a brief ↗
        </ContactButton>
      </div>
    </footer>
  );
}
