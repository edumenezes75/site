"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, MouseEvent } from "react";
import { gsap } from "@/lib/gsap";

type TransitionLinkProps = ComponentProps<typeof Link>;

export default function TransitionLink({ href, onClick, ...rest }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    const overlay = document.getElementById("page-transition-overlay");
    if (!overlay) return;

    e.preventDefault();
    gsap.set(overlay, { y: "100%" });
    gsap.to(overlay, {
      y: "0%",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => router.push(href.toString()),
    });
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
