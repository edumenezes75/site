"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "default" | "play" | "link";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    document.body.setAttribute("data-cursor-ready", "");
    return () => document.body.removeAttribute("data-cursor-ready");
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (target) {
        setVariant((target.dataset.cursor as Variant) || "default");
        setLabel(target.dataset.cursorLabel ?? "");
      }
    };

    const out = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (target) {
        setVariant("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  const size =
    variant === "default"
      ? { width: 10, height: 10 }
      : variant === "play"
        ? { width: 64, height: 64 }
        : { width: 96, height: 32 };

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[999] mix-blend-difference hidden md:flex items-center justify-center transition-[width,height] duration-200 ease-out"
      style={{
        width: size.width,
        height: size.height,
        borderRadius: variant === "link" ? 16 : 9999,
        background: "#F2F1ED",
      }}
    >
      {variant === "play" && <span className="text-black text-xs font-mono">▶</span>}
      {variant === "link" && (
        <span className="text-black text-[10px] font-mono uppercase tracking-widest px-2 truncate">
          {label}
        </span>
      )}
    </div>
  );
}
