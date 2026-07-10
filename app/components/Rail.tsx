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
    const idx = nav.findIndex((n) => n.id === active);
    if (fillRef.current) {
      fillRef.current.style.height = `${((idx + 1) / nav.length) * 100}%`;
    }
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
