"use client";

import Link from "next/link";

const links = [
  { href: "/#index", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#about", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white">
        <Link
          href="/"
          data-cursor="link"
          data-cursor-label="Home"
          className="font-display text-sm md:text-base font-medium tracking-normal"
        >
          Edu Menezes
        </Link>
        <div className="flex items-center gap-5 md:gap-7">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              data-cursor="link"
              data-cursor-label={l.label}
              className="transition-opacity hover:opacity-60"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
