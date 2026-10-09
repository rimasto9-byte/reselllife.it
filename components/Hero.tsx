"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { QUIZ_URL, ACADEMY_URL } from "@/lib/config";
import { Play, X, Sparkles } from "lucide-react";

const VIDEO_SRC    = "/videos/sito/video-principale.mp4";
const VIDEO_POSTER = "/videos/sito/thumb-principale.jpg";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { trackEvent("view_hero"); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero Resellife Academy"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-notte overflow-hidden flex flex-col items-center justify-center min-h-[92svh]"
    >
      {/* Background ambient lighting - Electric Violet Aura */}
      <div
        aria-hidden
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(124,58,237,0.3) 50%, transparent 80%)",
        }}
      />

      <div aria-hidden className="rl-aurora top-[8%] -left-24 w-[320px] h-[320px] bg-fuchsia-600/30" />
      <div aria-hidden className="rl-aurora bottom-[10%] -right-24 w-[360px] h-[360px] bg-violet-500/30" style={{ animationDelay: "-6s" }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

        {/* ── 1. HEADER TEXT ── */}
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-viola/15 border border-viola/30 text-viola text-xs font-poppins font-semibold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 text-viola" />
            <span>Resellife Academy</span>
          </div>

          <h1 className="font-anton text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.95] uppercase tracking-tight text-white mb-6">
            INIZIA A FARE <span className="text-viola">RESELLING</span>
            <br />
            <span className="rl-grad-text">CON UN METODO.</span>
          </h1>

          <p className="font-poppins text-[clamp(0.95rem,2vw,1.15rem)] text-white/80 leading-relaxed max-w-2xl mx-auto">
            Fornitori verificati, Bot Resellife, guide operative e community.
            Tutto quello che serve per iniziare — senza andare a tentativi.
          </p>
        </div>

        {/* ── 2. VIDEO — il file sorgente è verticale con barre nere laterali:
             si ritaglia con un frame 9:16 per mostrarlo a tutta altezza ── */}
        <div className="w-full max-w-[300px] sm:max-w-[340px] mb-8 relative">
          <div className="relative aspect-[344/596] rounded-3xl overflow-hidden bg-superficie border border-viola/40 shadow-[0_20px_60px_rgba(139,92,246,0.35)]">
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              className="absolute inset-0 w-full h-full object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            />

            {/* Gradiente + bottone play in basso, il volto resta libero */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-viola text-white font-poppins font-bold text-sm hover:bg-viola-hover transition-all active:scale-95 shadow-lg shadow-viola/40 whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-white" />
              Guarda con audio
            </button>
          </div>
        </div>

        {/* ── 3. BUTTONS AT THE BOTTOM ── */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
          <a
            href={QUIZ_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("cta_quiz_hero")}
            id="cta-quiz-hero"
            className="rl-cta-pulse py-4 px-8 rounded-btn bg-viola text-white font-poppins font-bold text-base uppercase tracking-wide hover:bg-viola-hover active:scale-95 transition-all duration-75 text-center shadow-lg shadow-viola/40"
          >
            FAI IL QUIZ →
          </a>
          <a
            href={ACADEMY_URL}
            onClick={() => trackEvent("cta_academy_hero")}
            id="cta-academy-hero"
            className="py-4 px-8 rounded-btn border border-white/30 bg-superficie/80 text-white font-poppins font-medium text-base uppercase tracking-wide hover:bg-white hover:text-notte active:scale-95 transition-all duration-75 text-center"
          >
            ENTRA IN ACADEMY
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-2 max-w-md" aria-label="Cosa include">
          <li className="rl-chip">✓ Fornitori verificati</li>
          <li className="rl-chip">✓ Bot Resellife</li>
          <li className="rl-chip">✓ Community</li>
        </ul>

      </div>

      {/* Modal Video Player */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-sm">
          <div className="relative w-full max-w-sm aspect-[344/596] max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <video
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              className="absolute inset-0 w-full h-full object-contain"
              autoPlay
              controls
              controlsList="nodownload noremoteplayback noplaybackrate"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              playsInline
            />
          </div>
        </div>
      )}

      {/* Bottom divider line */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 rl-divider-accent"
      />
    </section>
  );
}
