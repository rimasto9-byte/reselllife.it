"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import LeadForm from "./LeadForm";
import { FORM_ENDPOINT } from "@/lib/config";

export default function Hero() {
  const heroDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroDivRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent("view_hero");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroDivRef}
      id="hero"
      aria-label="Hero Resellife Academy"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-notte via-notte to-[#1A0A33] pointer-events-none"
      />
      {/* Subtle violet glow */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[60vw] h-[60vh] rounded-full bg-viola/5 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[40vw] h-[40vh] rounded-full bg-accento/5 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left column: copy ── */}
          <div>
            {/* Trust badge */}
            <div className="hero-animate-h1 inline-flex items-center gap-2 bg-superficie border border-bordo rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-accento inline-block" />
              <span className="text-xs font-medium text-testo/70 uppercase tracking-wider">
                700+ studenti italiani
              </span>
            </div>

            {/* H1 — text only, never an image */}
            <h1 className="hero-animate-h1 font-anton text-[clamp(2.8rem,8vw,5.5rem)] leading-none uppercase tracking-tight text-testo mb-6">
              DA 0 A 1000€
              <br />
              <span className="text-accento">CON IL RESELLING</span>
            </h1>

            <p className="hero-animate-sub text-[clamp(1rem,2vw,1.2rem)] text-testo/70 leading-relaxed mb-8 max-w-lg">
              Il metodo che 700+ studenti italiani seguono per costruirsi un
              extra mensile con il reselling: fornitori testati, strumenti
              concreti e supporto, fin dal primo giorno.
            </p>

            {/* Mobile CTA — scrolls to form */}
            <div className="hero-animate-cta lg:hidden">
              <a
                href="#form-hero"
                onClick={() => trackEvent("cta_guida_click")}
                className="block w-full py-4 px-6 rounded-btn bg-accento text-testo font-anton uppercase text-xl tracking-wide text-center hover:bg-accento-hover transition-all hover:scale-[1.02] active:scale-[0.99] shadow-lg shadow-accento/25"
              >
                SCARICA LA GUIDA GRATUITA
              </a>
              <p className="text-center text-xs text-testo/40 mt-2">
                Gratis. Nessuna carta richiesta.
              </p>
            </div>

            {/* Desktop: just show the microcopy, form is on the right */}
            <div className="hidden lg:block hero-animate-cta">
              <p className="text-sm text-testo/40">
                Gratis. Nessuna carta richiesta.
              </p>
            </div>

            {/* Social proof mini-row */}
            <div className="hero-animate-cta mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    aria-hidden
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-viola to-accento border-2 border-notte flex items-center justify-center text-xs font-bold text-testo"
                  >
                    {["M", "L", "G", "S"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-testo/60">
                Si sono iscritti{" "}
                <span className="text-testo font-medium">questa settimana</span>
              </p>
            </div>
          </div>

          {/* ── Right column: form (desktop) ── */}
          <div className="hidden lg:block hero-animate-cta">
            <LeadForm id="form-hero" formEndpoint={FORM_ENDPOINT} />
          </div>
        </div>

        {/* Mobile: form below copy */}
        <div id="form-hero" className="lg:hidden mt-10 hero-animate-cta">
          <LeadForm id="form-hero-mobile" formEndpoint={FORM_ENDPOINT} />
        </div>

        {/* Scroll indicator */}
        <div className="hero-animate-cta absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
          <span className="text-xs text-testo/30 uppercase tracking-widest">
            Scopri
          </span>
          <div className="w-5 h-8 border border-testo/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-testo/30 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
