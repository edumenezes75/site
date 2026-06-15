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
    // Gentle trailing motion (lerp) — a calmer, more refined cursor than a
    // dot snapping 1:1 to the pointer.
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (t) {
        setVariant((t.dataset.cursor as Variant) || "default");
        setLabel(t.dataset.cursorLabel ?? "");
      }
    };
    const out = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest<HTMLElement>("[data-cursor]")) {
        setVariant("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  const size =
    variant === "default"
      ? { width: 8, height: 8 }
      : variant === "play"
        ? { width: 46, height: 46 }
        : { width: 84, height: 30 };

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[999] mix-blend-difference hidden md:flex items-center justify-center transition-[width,height] duration-300 ease-out"
      style={{
        width: size.width,
        height: size.height,
        borderRadius: variant === "link" ? 15 : 9999,
        background: "#F2F1ED",
      }}
    >
      {variant === "play" && <span className="text-black text-[11px] font-mono">▶</span>}
      {variant === "link" && (
        <span className="text-black text-[9px] font-mono uppercase tracking-[0.15em] px-2 truncate">
          {label}
        </span>
      )}
    </div>
  );
}
