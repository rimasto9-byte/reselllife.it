"use client";

import { SHOW_BOT_SECTION } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useRef, useState } from "react";

// Animated status sequence: SCAN → FOUND → ALERT → BUY?
const STATUS_STATES = [
  { label: "SCAN", color: "text-muted/70", dot: "bg-muted/40" },
  { label: "FOUND", color: "text-viola",   dot: "bg-viola"    },
  { label: "ALERT", color: "text-accento", dot: "bg-accento"  },
  { label: "BUY?",  color: "text-emerald-400", dot: "bg-emerald-400" },
];

const FLOW = ["TROVA", "VALUTA", "ACQUISTA", "RIVENDI"];

export default function BotSection() {
  if (!SHOW_BOT_SECTION) return null;

  return <BotSectionInner />;
}

function BotSectionInner() {
  const [statusIdx, setStatusIdx] = useState(0);
  const [flowActive, setFlowActive] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);
  const animating = useRef(false);

  // Animate status when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animating.current) {
          animating.current = true;
          // Cycle through status states
          let i = 0;
          const cycleStatus = () => {
            setStatusIdx(i);
            i = (i + 1) % STATUS_STATES.length;
            setTimeout(cycleStatus, 850);
          };
          cycleStatus();
          // Animate flow steps
          FLOW.forEach((_, idx) => {
            setTimeout(() => setFlowActive(idx), idx * 600 + 1200);
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const currentStatus = STATUS_STATES[statusIdx];

  return (
    <section
      ref={sectionRef}
      id="bot"
      aria-labelledby="bot-heading"
      className="py-16 lg:py-28 bg-superficie relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-viola/8 via-transparent to-transparent pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-0 w-[50vw] h-[60%] -translate-y-1/2 rounded-full bg-viola/6 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-viola font-poppins font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Lo strumento
          </p>
          <h2
            id="bot-heading"
            className="font-anton text-[clamp(2rem,5vw,3.5rem)] uppercase text-testo leading-none mb-4"
          >
            IL TUO RADAR
            <br />
            <span className="text-viola">SUL MERCATO.</span>
          </h2>
          <p className="text-muted/70 font-poppins max-w-2xl mx-auto leading-relaxed">
            Il Bot Resellife scansiona il mercato in continuazione e ti segnala
            occasioni sottovalutate. Tu non passi le giornate a cercare: quando
            c&apos;è qualcosa che vale, arriva una notifica.
          </p>
        </div>

        {/* ── Two column: animated status + description ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">

          {/* Left: Animated status display */}
          <div className="relative">
            {/* Status panel — real video/screenshot goes here */}
            <div className="bg-notte border border-viola/25 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(123,47,214,0.2)]">
              {/* Mac-style bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-bordo bg-superficie/50">
                <div className="w-3 h-3 rounded-full bg-testo/15" />
                <div className="w-3 h-3 rounded-full bg-testo/15" />
                <div className="w-3 h-3 rounded-full bg-testo/15" />
                <span className="text-xs text-muted/50 font-poppins ml-2">Bot Resellife</span>
                {/* Live status badge */}
                <div className="ml-auto flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${currentStatus.dot} transition-colors duration-300`} />
                  <span className={`text-xs font-poppins font-bold tracking-widest ${currentStatus.color} transition-colors duration-300`}>
                    {currentStatus.label}
                  </span>
                </div>
              </div>

              {/* 
                REAL VIDEO: replace the placeholder box below with:
                <video
                  className="w-full aspect-video object-cover"
                  src="/videos/bot-demo.mp4"
                  autoPlay muted loop playsInline
                />
                and the screenshot with:
                <Image src="/images/bot-screenshot.png" alt="Screenshot Bot Resellife" width={600} height={400} className="w-full" />
              */}
              <div className="aspect-video bg-gradient-to-br from-[#1a0835] to-notte flex items-center justify-center">
                <div className="text-center p-6">
                  <div className={`text-4xl font-anton mb-2 transition-all duration-300 ${currentStatus.color}`}>
                    {currentStatus.label}
                  </div>
                  <p className="text-xs text-muted/40 font-poppins">
                    Video reale del Bot in arrivo (Drive: VIDEO BOT)
                  </p>
                  <p className="text-[10px] text-testo/20 font-poppins mt-1">
                    Sostituire con video mp4 + screenshot reali
                  </p>
                </div>
              </div>

              {/* Alert types list */}
              <div
                className="p-4 space-y-2"
                onClick={() => trackEvent("bot_panel_click")}
              >
                {[
                  { badge: "URGENTE",   msg: "Errore di prezzo — prodotto pubblicato a -90% del valore", color: "bg-red-500/15 text-red-400 border-red-500/30" },
                  { badge: "OCCASIONE", msg: "Sneaker premium a -75% rispetto al prezzo medio",          color: "bg-viola/15 text-viola border-viola/30" },
                  { badge: "VALUTA",    msg: "Capo stagione -85% · finestra di 48h",                     color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
                ].map((n, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-superficie border border-bordo rounded-xl p-3 hover:border-viola/30 transition-colors duration-200 cursor-default"
                  >
                    <span className={`flex-shrink-0 text-[10px] font-poppins font-bold border rounded-full px-2 py-0.5 mt-0.5 ${n.color}`}>
                      {n.badge}
                    </span>
                    <p className="text-xs text-muted/70 leading-snug font-poppins">{n.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: What the bot does */}
          <div className="space-y-6">
            {[
              {
                title: "ERRORI DI PREZZO",
                color: "border-red-500/25 bg-red-500/8",
                icon: "text-red-400",
                body: "Chi pubblica non conosce il valore reale del capo. Il Bot intercetta questi errori prima che vengano corretti.",
                example: "Giacca da 45€ pubblicata a 3,99€",
              },
              {
                title: "ANNUNCI SOTTOPREZZATI",
                color: "border-viola/30 bg-viola/8",
                icon: "text-viola",
                body: "Occasioni dove il venditore ha fretta e accetta un margine ridotto. Margini alti, tempi brevi.",
                example: "Sneaker premium a -75% del prezzo medio",
              },
              {
                title: "OPPORTUNITÀ DA VALUTARE",
                color: "border-emerald-500/25 bg-emerald-500/8",
                icon: "text-emerald-400",
                body: "Alert tempestivi su prodotti ad alta probabilità di rivendita rapida — prima che la visibilità scada.",
                example: "Capo stagione -85% · 48h di visibilità",
              },
            ].map((a, i) => (
              <div
                key={i}
                className={`border ${a.color} rounded-card-lg p-5 hover:border-opacity-70 transition-colors duration-200`}
              >
                <h3 className={`font-anton text-base uppercase mb-2 tracking-wide ${a.icon}`}>
                  {a.title}
                </h3>
                <p className="text-sm text-muted/65 font-poppins leading-relaxed mb-2">{a.body}</p>
                <p className={`text-xs font-poppins font-medium ${a.icon} opacity-80 bg-notte/60 rounded-lg px-3 py-1.5 inline-block`}>
                  Es: {a.example}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Animated flow diagram ── */}
        <div className="border-t border-bordo pt-12">
          <p className="text-center text-xs font-poppins font-semibold uppercase tracking-[0.2em] text-muted/40 mb-8">
            Il flusso operativo
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {FLOW.map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-500 ${
                      flowActive >= i
                        ? "bg-viola/25 border-viola shadow-viola/20"
                        : "bg-viola/10 border-viola/25"
                    }`}
                  >
                    <span className={`font-anton text-sm transition-colors duration-500 ${flowActive >= i ? "text-viola" : "text-viola/40"}`}>
                      {i + 1}
                    </span>
                  </div>
                  <p
                    className={`font-anton text-xs uppercase mt-2 tracking-wider transition-colors duration-500 ${
                      flowActive >= i ? "text-testo/80" : "text-testo/30"
                    }`}
                  >
                    {step}
                  </p>
                </div>
                {i < FLOW.length - 1 && (
                  <svg
                    aria-hidden
                    className={`w-5 h-5 hidden sm:block transition-colors duration-500 ${flowActive > i ? "text-viola/60" : "text-viola/20"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
