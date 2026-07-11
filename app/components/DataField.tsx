"use client";

import { useEffect, useRef } from "react";
import { ParticleField } from "@/lib/particles/engine";

const MAX_DPR = 1.5;
const MOBILE_BREAKPOINT = 900;

export default function DataField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = canvas.closest(".hero") as HTMLElement | null;
    if (!container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const field = new ParticleField(ctx, { isMobile: window.innerWidth < MOBILE_BREAKPOINT });

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let isIntersecting = true;
    let isTabVisible = document.visibilityState === "visible";
    let running = true;
    const updateRunning = () => {
      running = isIntersecting && isTabVisible;
    };

    function resizeCanvas() {
      const rect = container!.getBoundingClientRect();
      canvas!.width = Math.max(1, Math.round(rect.width * dpr));
      canvas!.height = Math.max(1, Math.round(rect.height * dpr));
      field.resize(rect.width, rect.height, dpr);
    }
    resizeCanvas();

    let rafId = 0;
    let lastTime = performance.now();
    function loop(now: number) {
      rafId = requestAnimationFrame(loop);
      if (!running) {
        lastTime = now;
        return;
      }
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      field.step(dt);
      field.render();
    }
    rafId = requestAnimationFrame(loop);

    function handlePointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      field.setPointer(e.clientX - rect.left, e.clientY - rect.top);
    }
    function handlePointerLeave() {
      field.setPointer(null, null);
    }
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        updateRunning();
      },
      { threshold: 0 }
    );
    io.observe(container);

    function handleVisibilityChange() {
      isTabVisible = document.visibilityState === "visible";
      updateRunning();
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      io.disconnect();
      ro.disconnect();
      field.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-field-canvas" aria-hidden="true" />;
}
