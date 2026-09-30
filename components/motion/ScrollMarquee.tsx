"use client";

import { useReducedMotion } from "motion/react";

const ROW1 = ["METODO", "FORNITORI", "BOT", "GUIDE", "COMMUNITY"];
const ROW2 = ["ACQUISTA", "VENDI", "RIPETI"];
const SEP = "✦";

function buildRow(items: string[]) {
  // 4 times to ensure it fills super wide screens seamlessly
  return [...items, ...items, ...items, ...items];
}

/**
 * ScrollMarquee — pink (accento) band slightly rotated.
 * Two rows of giant Anton text move continuously using pure CSS for 60fps performance.
 * Replaces scroll-driven framer-motion to fix stuttering on Android.
 */
export default function ScrollMarquee() {
  const shouldReduce = useReducedMotion();

  // If user prefers reduced motion, pause the animation
  const animStyle = shouldReduce ? { animationPlayState: "paused" } : {};

  return (
    <div
      aria-label="Pilastri: Metodo, Fornitori, Bot, Guide, Community. Acquista, Vendi, Ripeti."
      className="relative overflow-hidden py-6"
      style={{
        backgroundColor: "#FF1FA8",
        transform: "rotate(-1deg) scaleX(1.03)",
        marginBlock: "clamp(1.5rem, 4vw, 3rem)",
      }}
    >
      {/* Row 1 — solid inchiostro, moves Left */}
      <div
        aria-hidden
        className="flex whitespace-nowrap mb-1 w-max"
        style={{
          animation: "marquee-left 35s linear infinite",
          ...animStyle,
        }}
      >
        {buildRow(ROW1).map((item, i) => (
          <span
            key={i}
            className="font-anton uppercase text-[#0A0A0A] flex items-center gap-4 px-6"
            style={{ fontSize: "clamp(2.8rem, 9vw, 8rem)", lineHeight: 0.88 }}
          >
            {item}
            <span className="text-[#0A0A0A]/40 text-[0.3em]">{SEP}</span>
          </span>
        ))}
      </div>

      {/* Row 2 — outlined text, moves Right */}
      <div
        aria-hidden
        className="flex whitespace-nowrap w-max"
        style={{
          animation: "marquee-right 30s linear infinite",
          ...animStyle,
        }}
      >
        {buildRow(ROW2).map((item, i) => (
          <span
            key={i}
            className="font-anton uppercase flex items-center gap-4 px-6"
            style={{
              fontSize: "clamp(2.8rem, 9vw, 8rem)",
              lineHeight: 0.88,
              color: "transparent",
              WebkitTextStroke: "2px #0A0A0A",
            }}
          >
            {item}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(10,10,10,0.4)",
                fontSize: "0.3em",
              }}
            >
              {SEP}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
