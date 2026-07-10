"use client";
import { useState } from "react";
import { nav } from "@/lib/data";

export default function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="topbar">
        <div className="topbar-id">
          <span className="topbar-dot" aria-hidden="true" />
          Sandeep&nbsp;Parmar <span className="topbar-sep">/</span> Data Analyst · AI Systems
        </div>
        <nav className="topbar-nav" aria-label="Section navigation">
          {nav.map((n, i) => (
            <a key={n.id} href={`#${n.id}`}>
              {String(i + 1).padStart(2, "0")} {n.label}
            </a>
          ))}
        </nav>
        <a className="topbar-cta" href="mailto:parmarsandeep01@gmail.com">
          Get in touch
        </a>
        <button
          className={`topbar-burger${open ? " open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <nav
        className={`mobile-nav${open ? " open" : ""}`}
        aria-label="Mobile section navigation"
      >
        {nav.map((n, i) => (
          <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
            {String(i + 1).padStart(2, "0")} · {n.label}
          </a>
        ))}
      </nav>
    </>
  );
}
