"use client";

import { useEffect } from "react";

/**
 * TextFx — anima titoli e paragrafi quando entrano in viewport
 * (sfocatura → nitido + salita). Aggiunge le classi solo via JS, quindi senza JS
 * il testo resta visibile. Salta ciò che è già animato (data-reveal, motion) o
 * già in vista al caricamento. Rispetta prefers-reduced-motion.
 */
export default function TextFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SKIP = "[data-reveal], #sticky-statement, nav, footer, [data-fx-skip]";
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("main h1, main h2, main h3, main p")
    ).filter((el) => !el.closest(SKIP));

    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          // piccolo sfalsamento tra elementi che entrano insieme
          el.style.transitionDelay = `${Math.min(entries.indexOf(e), 4) * 90}ms`;
          el.classList.add("fx-in");
          io.unobserve(el);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );

    targets.forEach((el) => {
      const isTitle = /^H[1-3]$/.test(el.tagName);
      if (el.getBoundingClientRect().top < vh * 0.9 && window.scrollY < 50) return; // già visibile
      el.classList.add(isTitle ? "fx-title" : "fx-text");
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
