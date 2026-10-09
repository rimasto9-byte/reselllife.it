"use client";

import { useRef, useState, useEffect } from "react";
import { ShoppingBag, Tag, RefreshCw, Sparkles, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

const steps = [
  {
    id: "acquista",
    n: "01",
    title: "ACQUISTA",
    subtitle: "Trova prodotti a prezzi bassi",
    body: "Individui i prodotti giusti da comprare a prezzo basso: fornitori già testati dall'Academy o segnalazioni dal Bot Resellife in tempo reale.",
    detail: "Fornitori verificati · Bot Resellife in tempo reale",
    videoSrc: "/videos/metodo/aquista.mp4",
    tag: "FASE 01 · SELEZIONE",
    borderGlow: "border-viola shadow-[0_0_40px_rgba(123,47,214,0.4)]",
    badgeBg: "bg-viola/20 text-viola border-viola/40",
    Icon: ShoppingBag,
  },
  {
    id: "vendi",
    n: "02",
    title: "VENDI",
    subtitle: "Pubblica sui principali marketplace",
    body: "Pubblichi su Vinted, Subito o il marketplace più adatto al prodotto, seguendo le strategie di prezzo e presentazione dell'Academy.",
    detail: "Vinted · Subito · Strategia di prezzo",
    videoSrc: "/videos/metodo/vendi.mp4",
    tag: "FASE 02 · LISTING & VENDITA",
    borderGlow: "border-[#3B82F6] shadow-[0_0_40px_rgba(59,130,246,0.4)]",
    badgeBg: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    Icon: Tag,
  },
  {
    id: "ripeti",
    n: "03",
    title: "RIPETI",
    subtitle: "Scala il tuo margine nel tempo",
    body: "Reinvesti il margine, aumenti il numero di operazioni e costruisci un'entrata strutturata nel tempo — non un affare occasionale.",
    detail: "Reinvestimento · Automazione · Scaling",
    videoSrc: "/videos/metodo/ripeti.mp4",
    tag: "FASE 03 · CRESCITA",
    borderGlow: "border-[#A855F7] shadow-[0_0_40px_rgba(168,85,247,0.4)]",
    badgeBg: "bg-[#A855F7]/20 text-[#A855F7] border-[#A855F7]/40",
    Icon: RefreshCw,
  },
];

export default function Metodo() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveIndex(Math.min(Math.max(index, 0), steps.length - 1));
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.clientWidth * 0.85;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section
      id="metodo"
      aria-labelledby="metodo-heading"
      className="py-20 lg:py-32 bg-notte relative overflow-hidden text-testo"
    >
      {/* ── Intense Ambient Glow Backdrops ── */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[1200px] h-[600px] rounded-full blur-[170px] pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(123,47,214,0.95) 0%, rgba(168,85,247,0.55) 50%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-viola/20 border border-viola/40 text-white text-xs font-poppins font-semibold uppercase tracking-widest mb-5 shadow-[0_0_20px_rgba(123,47,214,0.4)]">
            <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>IL METODO PROPRIETARIO</span>
          </div>
          
          <h2
            id="metodo-heading"
            className="font-anton text-[clamp(2.5rem,8vw,5.5rem)] uppercase leading-[0.92] tracking-tight text-white mb-4"
          >
            IL METODO <span className="bg-gradient-to-r from-white via-viola to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(123,47,214,0.6)]">RESELLIFE.</span>
          </h2>
          
          <p className="font-poppins text-white/80 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Un sistema in 3 passi. <span className="text-white font-semibold">Scorri verso destra per scoprire ogni fase.</span>
          </p>

          {/* Swipe indicator badge for Mobile */}
          <div className="lg:hidden mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-poppins text-white/80 border border-white/15">
            <span>Desliza de lado</span>
            <ChevronRight className="w-4 h-4 text-viola animate-pulse" />
          </div>
        </div>

        {/* ── Horizontal Snap Carousel on Mobile / 3-Column Grid on Desktop ── */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={`snap-center flex-shrink-0 w-[85vw] sm:w-[380px] lg:w-auto relative flex flex-col justify-between rounded-[32px] bg-gradient-to-b from-superficie/95 via-notte/90 to-superficie/95 border ${step.borderGlow} p-6 backdrop-blur-2xl transition-all duration-300`}
            >
              {/* Card Top Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="font-anton text-4xl text-white tracking-tight">
                    {step.n}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                    <step.Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-poppins font-bold uppercase tracking-wider border ${step.badgeBg}`}>
                  {step.tag}
                </span>
              </div>

              {/* Smartphone Frame Video Container */}
              <div className="relative w-full aspect-[9/16] rounded-[26px] overflow-hidden bg-black border border-white/15 shadow-2xl mb-5">
                <video
                  src={step.videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Step Info Content */}
              <div className="flex flex-col flex-1 justify-between text-left">
                <div>
                  <h3 className="font-anton text-3xl uppercase text-white tracking-wide mb-1">
                    {step.title}
                  </h3>
                  
                  <p className="font-poppins text-viola text-xs font-semibold mb-3">
                    {step.subtitle}
                  </p>

                  <p className="font-poppins text-white/80 text-xs sm:text-sm leading-relaxed mb-5">
                    {step.body}
                  </p>
                </div>

                {/* Highlight Chip */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mt-auto">
                  <div className="flex items-center gap-1.5 text-xs font-poppins font-semibold text-[#A855F7] uppercase tracking-wider mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A855F7]" />
                    <span>STRUMENTI CHIAVE</span>
                  </div>
                  <p className="text-xs font-poppins font-medium text-white/90">
                    {step.detail}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── Carousel Dots & Navigation Controls for Mobile ── */}
        <div className="flex items-center justify-center gap-3 mt-6 lg:hidden">
          <button
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="p-2 rounded-full bg-white/10 text-white disabled:opacity-30 border border-white/15"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "w-8 bg-gradient-to-r from-viola to-[#A855F7] shadow-[0_0_15px_rgba(123,47,214,0.8)]"
                    : "w-2.5 bg-white/20"
                }`}
                aria-label={`Ir al paso ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToIndex(Math.min(steps.length - 1, activeIndex + 1))}
            disabled={activeIndex === steps.length - 1}
            className="p-2 rounded-full bg-white/10 text-white disabled:opacity-30 border border-white/15"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ── Footer Quote ── */}
        <div className="mt-14 text-center">
          <p className="font-poppins text-white/70 text-sm sm:text-base italic">
            "Il reselling non è un'illusione. È un <span className="text-viola not-italic font-bold">processo ripetibile</span>."
          </p>
        </div>

      </div>
    </section>
  );
}
