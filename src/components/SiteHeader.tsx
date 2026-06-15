"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { BRIEF_MAILTO } from "@/lib/contact";

const links = [
  { href: "/#index", label: "Work" },
  { href: "/#about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">
        <Link
          href="/"
          data-cursor="link"
          data-cursor-label="Home"
          className="font-display text-sm md:text-base font-medium tracking-normal text-white mix-blend-difference"
        >
          Edu Menezes
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-5 md:gap-7 text-white mix-blend-difference">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-cursor="link"
                data-cursor-label={l.label}
                className="transition-opacity hover:opacity-60"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <a
            href={BRIEF_MAILTO}
            data-cursor="link"
            data-cursor-label="Email"
            onClick={() => track("start_project", { location: "header" })}
            className="rounded-full bg-gold px-3.5 py-1.5 text-bg tracking-[0.15em] transition-opacity hover:opacity-85"
          >
            Send a brief
          </a>
        </div>
      </nav>
    </header>
  );
}
