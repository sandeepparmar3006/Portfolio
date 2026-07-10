"use client";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/data";

export default function Rail() {
  const [active, setActive] = useState("intake");
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const idx = nav.findIndex((n) => n.id === active);
      if (fillRef.current) {
        fillRef.current.style.height = `${((idx + 1) / nav.length) * 100}%`;
      }
      return;
    }
    let raf: number;
    const tick = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const fraction = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (fillRef.current) {
        fillRef.current.style.height = `${Math.min(1, Math.max(0, fraction)) * 100}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div className="rail" aria-hidden="true">
      <div className="rail-track">
        <div className="rail-fill" ref={fillRef} />
      </div>
      <div className="rail-nodes">
        {nav.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={`rail-node${active === n.id ? " active" : ""}`}
          >
            <span className="rail-node-label">{n.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
