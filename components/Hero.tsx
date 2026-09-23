"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";
import { QUIZ_URL, ACADEMY_URL } from "@/lib/config";

// Floating badge data — swapped for video when real asset is added
const BADGES = [
  { label: "VINTED",      delay: 0,    top: "12%",  left: "-8%"  },
  { label: "+28€",        delay: 150,  top: "32%",  right: "-10%"},
  { label: "BOT ALERT",  delay: 300,  top: "60%",  left: "-12%"  },
  { label: "VENDUTO ✓",  delay: 450,  top: "78%",  right: "-8%"  },
  { label: "700+ ISCRITTI", delay: 600, top: "5%", right: "5%"   },
];

// Logo path — replace with real logo from Drive
const LOGO_SRC = "/logo.png";

export default function Hero() {
  const heroDivRef  = useRef<HTMLDivElement>(null);
  const [logoErr, setLogoErr] = useState(false);
  const [visibleBadges, setVisibleBadges] = useState<boolean[]>(
    Array(BADGES.length).fill(false)
  );

  // Analytics impression
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

  // Staggered badge reveal
  useEffect(() => {
    BADGES.forEach((badge, i) => {
      setTimeout(() => {
        setVisibleBadges(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 800 + badge.delay);
    });
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
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[70vw] h-[70vh] rounded-full bg-viola/10 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[40vw] h-[40vh] rounded-full bg-accento/5 blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left column: copy ── */}
          <div>
            {/* 700+ badge */}
            <div className="hero-animate-h1 inline-flex items-center gap-2 bg-viola/10 border border-viola/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-viola inline-block animate-pulse" />
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                700+ studenti italiani · Resellife Academy
              </span>
            </div>

            {/* Logo (if available) */}
            {!logoErr && (
              <div className="hero-animate-h1 mb-4">
                <Image
                  src={LOGO_SRC}
                  alt="Resellife Academy"
                  width={180}
                  height={48}
                  className="h-10 w-auto object-contain"
                  onError={() => setLogoErr(true)}
                  priority
                />
              </div>
            )}

            {/* H1 */}
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

          {/* ── Right column: video + floating badges ── */}
          <div className="hidden lg:flex items-center justify-center hero-animate-cta">
            <div className="relative">
              {/* Phone/video frame */}
              <div className="relative w-[300px] aspect-[9/16] rounded-[28px] overflow-hidden shadow-[0_0_80px_rgba(123,47,214,0.4)] border border-viola/20">
                {/*
                  REAL VIDEO: when the mp4 is available from Drive, replace the
                  gradient placeholder below with:
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/videos/hero.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a0835] via-viola/30 to-[#0D0714] flex flex-col items-center justify-center gap-4 p-6">
                  <div className="w-16 h-16 rounded-full bg-viola/20 border border-viola/40 flex items-center justify-center mb-2">
                    {!logoErr ? (
                      <Image
                        src={LOGO_SRC}
                        alt="Resellife"
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain"
                        onError={() => setLogoErr(true)}
                      />
                    ) : (
                      <span className="font-anton text-viola text-lg">R</span>
                    )}
                  </div>
                  <p className="text-center text-xs text-muted/60 font-poppins">
                    Video reale in arrivo
                    <br />
                    <span className="text-testo/30 text-[10px]">Drive: CLIP RESELLIFE ACADEMY</span>
                  </p>
                  {/* Simulated stats */}
                  <div className="w-full space-y-2 mt-2">
                    {[
                      { label: "Vendita conclusa", value: "+28€", color: "text-emerald-400" },
                      { label: "Acquisto completato", value: "12€ → 45€", color: "text-viola" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-notte/70 backdrop-blur-sm border border-viola/15 rounded-xl p-3 flex items-center justify-between">
                        <span className="text-xs text-muted/70 font-poppins">{stat.label}</span>
                        <span className={`text-xs font-bold font-poppins ${stat.color}`}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Floating badges ── */}
              {BADGES.map((badge, i) => (
                <div
                  key={i}
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: badge.top,
                    left: badge.left,
                    right: badge.right,
                    opacity: visibleBadges[i] ? 1 : 0,
                    transform: visibleBadges[i] ? "translateY(0)" : "translateY(8px)",
                    transition: `opacity 0.4s ease, transform 0.4s ease`,
                  }}
                  className="bg-notte/85 backdrop-blur-md border border-viola/30 rounded-full px-3 py-1.5 text-xs font-poppins font-semibold text-testo shadow-lg shadow-viola/20 whitespace-nowrap"
                >
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 hero-animate-cta">
        <span className="text-xs text-testo/30 uppercase tracking-widest">Scopri</span>
        <div className="w-5 h-8 border border-testo/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-viola/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
