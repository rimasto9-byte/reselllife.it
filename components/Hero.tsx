"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { QUIZ_URL, ACADEMY_URL } from "@/lib/config";
import { ShoppingBag, Package, TrendingUp } from "lucide-react";

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
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-notte via-[#110820] to-[#1a0835] pointer-events-none"
      />
      {/* Violet glow top-right */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[70vw] h-[70vh] rounded-full bg-viola/10 blur-[120px] pointer-events-none"
      />
      {/* Magenta accent glow bottom-left */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[40vw] h-[40vh] rounded-full bg-accento/5 blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left column: copy ── */}
          <div>
            {/* Badge */}
            <div className="hero-animate-h1 inline-flex items-center gap-2 bg-viola/10 border border-viola/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-viola inline-block animate-pulse" />
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                700+ studenti italiani · Resellife Academy
              </span>
            </div>

            {/* H1 — testo unico, mai un'immagine */}
            <h1 className="hero-animate-h1 font-anton text-[clamp(2.6rem,7vw,5rem)] leading-none uppercase tracking-tight text-testo mb-6">
              INIZIA A FARE
              <br />
              RESELLING
              <br />
              <span className="text-viola">CON UN METODO.</span>
            </h1>

            <p className="hero-animate-sub text-[clamp(0.95rem,1.8vw,1.1rem)] text-muted leading-relaxed mb-8 max-w-lg font-poppins">
              Fornitori, strumenti, guide e supporto per iniziare nel reselling
              senza andare a tentativi.
            </p>

            {/* CTAs */}
            <div className="hero-animate-cta flex flex-col sm:flex-row gap-3 mb-8">
              {/* CTA primaria → quiz */}
              <a
                href={QUIZ_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_quiz_hero")}
                id="cta-quiz-hero"
                className="flex-1 sm:flex-none py-4 px-6 rounded-btn bg-viola text-testo font-poppins font-semibold text-base text-center hover:bg-viola-hover transition-all hover:scale-[1.02] active:scale-[0.99] shadow-lg shadow-viola/30 whitespace-nowrap"
              >
                SCOPRI SE IL RESELLING FA PER TE →
              </a>
              {/* CTA secondaria → sezione Academy */}
              <a
                href="#scelta"
                onClick={() => trackEvent("cta_academy_hero")}
                id="cta-academy-hero"
                className="flex-1 sm:flex-none py-4 px-6 rounded-btn border border-testo/30 text-testo font-poppins font-medium text-base text-center hover:border-viola/60 hover:bg-viola/10 transition-all whitespace-nowrap"
              >
                SCOPRI RESELLIFE ACADEMY
              </a>
            </div>

            {/* Social proof mini-row */}
            <div className="hero-animate-cta flex items-center gap-4">
              <div className="flex -space-x-2">
                {["M", "L", "G", "S"].map((letter, i) => (
                  <div
                    key={i}
                    aria-hidden
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-viola to-accento border-2 border-notte flex items-center justify-center text-xs font-bold text-testo"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-sm text-testo/60 font-poppins">
                Si sono iscritti{" "}
                <span className="text-testo font-medium">questa settimana</span>
              </p>
            </div>
          </div>

          {/* ── Right column: visual placeholder (sostituire con video mp4 nativo) ── */}
          <div className="hidden lg:flex items-center justify-center hero-animate-cta">
            <div className="relative w-[320px] aspect-[9/16] rounded-[28px] overflow-hidden shadow-[0_0_80px_rgba(123,47,214,0.4)] border border-viola/20">
              {/* Gradient placeholder — sostituire con <video> mp4 nativo autoPlay muted loop playsInline */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a0835] via-viola/30 to-[#0D0714] flex flex-col items-center justify-center gap-6 p-8">
                {/* Simulated phone notification cards */}
                {[
                  { Icon: ShoppingBag, iconClass: "text-viola", text: "Vinted — annuncio trovato", sub: "Prezzo medio: 45€ · Venduto a: 12€" },
                  { Icon: Package,     iconClass: "text-viola", text: "Acquisto completato",       sub: "Budget: 12€ → Valore: 45€" },
                  { Icon: TrendingUp,  iconClass: "text-emerald-400", text: "Vendita conclusa!", sub: "+28€ di margine netto" },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="w-full bg-notte/80 backdrop-blur-sm border border-viola/20 rounded-2xl p-4 flex items-start gap-3"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <div className={`flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-viola/10 flex items-center justify-center`}>
                      <card.Icon className={`w-4 h-4 ${card.iconClass}`} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-testo">{card.text}</p>
                      <p className="text-xs text-muted mt-0.5">{card.sub}</p>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-testo/30 text-center mt-2">
                  ⚠️ Sostituire con video mp4 reale (Drive: CLIP RESELLIFE ACADEMY)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 hero-animate-cta">
        <span className="text-xs text-testo/30 uppercase tracking-widest">
          Scopri
        </span>
        <div className="w-5 h-8 border border-testo/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-viola/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
