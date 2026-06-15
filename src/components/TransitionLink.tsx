"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, forwardRef, MouseEvent } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type TransitionLinkProps = ComponentProps<typeof Link>;

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink({ href, onClick, ...rest }, ref) {
    const router = useRouter();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

      const overlay = document.getElementById("page-transition-overlay");
      if (!overlay) return;

      // With reduced motion, skip the curtain wipe and navigate immediately.
      if (prefersReducedMotion()) {
        e.preventDefault();
        router.push(href.toString());
        return;
      }

      e.preventDefault();
      gsap.set(overlay, { y: "100%" });
      gsap.to(overlay, {
        y: "0%",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => router.push(href.toString()),
      });
    };

    return <Link ref={ref} href={href} onClick={handleClick} {...rest} />;
  }
);

export default TransitionLink;
