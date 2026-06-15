import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-bg text-fg h-screen flex flex-col justify-between px-6 md:px-12 py-8">
      <div className="flex items-center justify-between font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-fg/50">
        <span>Edu Menezes</span>
        <span>00:00:00:00</span>
      </div>

      <div>
        <h1 className="font-display font-medium text-[20vw] md:text-[14vw] leading-[0.85] uppercase">
          404
        </h1>
        <p className="mt-6 font-mono text-xs md:text-base uppercase tracking-[0.2em] text-fg/60">
          This frame isn&apos;t in the edit.
        </p>
        <Link
          href="/"
          data-cursor="link"
          data-cursor-label="Home"
          className="mt-8 inline-block font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-gold hover:text-fg transition-colors"
        >
          ← All work
        </Link>
      </div>

      <div className="h-10 w-full border-t border-fg/10" />
    </main>
  );
}
