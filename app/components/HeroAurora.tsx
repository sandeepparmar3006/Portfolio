"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

const MAX_OFFSET = 40; // px, clamped parallax travel for the nearest blob
const SPRING = { stiffness: 50, damping: 20 };

const BLOBS = [
  { variant: "a", depth: 1 },
  { variant: "b", depth: 0.65 },
  { variant: "c", depth: 0.35 },
] as const;

function AuroraBlob({
  variant,
  depth,
  pointerX,
  pointerY,
}: {
  variant: (typeof BLOBS)[number]["variant"];
  depth: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const x = useSpring(useTransform(pointerX, (v) => v * depth), SPRING);
  const y = useSpring(useTransform(pointerY, (v) => v * depth), SPRING);
  return (
    <div className={`aurora-blob aurora-blob--${variant}`}>
      <motion.div className="aurora-blob-inner" style={{ x, y }} />
    </div>
  );
}

export default function HeroAurora() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const wrap = wrapRef.current;
    const container = wrap?.closest(".hero") as HTMLElement | null;
    if (!container) return;

    function handlePointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      pointerX.set(relX * MAX_OFFSET * 2);
      pointerY.set(relY * MAX_OFFSET * 2);
    }
    function handlePointerLeave() {
      pointerX.set(0);
      pointerY.set(0);
    }
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reduce, pointerX, pointerY]);

  return (
    <div
      ref={wrapRef}
      className={`hero-aurora${reduce ? " hero-aurora--static" : ""}`}
      aria-hidden="true"
    >
      {BLOBS.map((b) => (
        <AuroraBlob
          key={b.variant}
          variant={b.variant}
          depth={b.depth}
          pointerX={pointerX}
          pointerY={pointerY}
        />
      ))}
    </div>
  );
}
