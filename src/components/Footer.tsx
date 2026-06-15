import ContactButton from "@/components/ContactButton";
import { EMAIL } from "@/lib/contact";

export default function Footer() {
  return (
    <footer
      id="about"
      className="bg-bg text-fg px-6 md:px-12 py-20 md:py-32 border-t border-fg/10"
    >
      <div className="grid gap-16 md:grid-cols-2">
        {/* About */}
        <div className="max-w-xl">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/50 mb-6">About</h2>
          <p className="font-display text-2xl md:text-3xl text-fg/85 leading-snug">
            I&apos;m a senior motion designer and editor — 20+ years across
            advertising, film and documentary.
          </p>
          <p className="mt-6 font-display text-xl md:text-2xl text-fg/65 leading-snug">
            I&apos;ve freelanced with leading agencies in Brazil and worldwide —
            Wieden+Kennedy, GUT, Ogilvy, R/GA, AlmapBBDO, and U.S. shops like
            FCB Chicago and BBH New York — and spent years at O2 Filmes alongside
            directors such as Fernando Meirelles. Lately I led motion, VFX and
            titles on <span className="italic">Bituca</span>, the Milton Nascimento
            documentary that ran in cinemas and on TV Globo.
          </p>
          <p className="mt-6 font-display text-xl md:text-2xl text-fg/65 leading-snug">
            What I chase is rhythm — the cut, the pace, the moment a piece breathes,
            where motion stops being decoration and becomes the idea. Recognized at
            Cannes Lions, El Ojo and D&amp;AD.
          </p>
        </div>

        {/* Contact — the single conversion action */}
        <div className="flex flex-col md:items-end md:text-right">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/60 mb-6">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold motion-safe:animate-pulse" />
            Available for projects worldwide
          </span>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mb-8">
            Have a brief?<br />
            <span className="italic">Let&apos;s talk.</span>
          </h2>

          <ContactButton
            location="footer"
            cursorLabel="Email"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-gold px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85"
          >
            Start a project ↗
          </ContactButton>

          <div className="mt-8 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/60">
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
      </div>
    </footer>
  );
}
