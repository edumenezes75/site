export default function Footer() {
  return (
    <footer
      id="about"
      className="bg-bg text-fg px-6 md:px-12 py-16 md:py-24 border-t border-fg/10 flex flex-col md:flex-row md:items-end md:justify-between gap-10"
    >
      <div className="max-w-xl">
        <h2 className="font-display font-medium text-3xl md:text-6xl uppercase mb-6">About</h2>
        <p className="font-mono text-xs md:text-base text-fg/70 leading-relaxed">
          Edu Menezes is a director, motion designer and editor, with work for
          Adidas, Budweiser, Vivo, Itaú and UNESCO — in recurring partnership
          with Africa Creative DDB. His work pairs editorial rhythm with
          cinematic motion design, recognized at Cannes Lions, Effie and El
          Ojo de Iberoamérica.
        </p>
      </div>

      <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.2em]">
        <a
          href="https://www.linkedin.com/in/edumenezesmotion/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          data-cursor-label="Open"
          className="hover:text-gold transition-colors"
        >
          LinkedIn ↗
        </a>
        <a
          href="mailto:edumenezes75@gmail.com"
          data-cursor="link"
          data-cursor-label="Email"
          className="hover:text-gold transition-colors"
        >
          Email ↗
        </a>
      </div>
    </footer>
  );
}
