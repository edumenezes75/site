"use client";

import { track } from "@vercel/analytics";
import { BRIEF_MAILTO } from "@/lib/contact";

type Props = {
  children: React.ReactNode;
  location: string; // where the click came from, for analytics
  className?: string;
  cursorLabel?: string;
};

// Single conversion action of the site: start a briefing email.
export default function ContactButton({ children, location, className, cursorLabel = "Email" }: Props) {
  return (
    <a
      href={BRIEF_MAILTO}
      data-cursor="link"
      data-cursor-label={cursorLabel}
      onClick={() => track("start_project", { location })}
      className={className}
    >
      {children}
    </a>
  );
}
