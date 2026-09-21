"use client";

import { SHOW_BOT_SECTION } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import { AlertCircle, TrendingDown, CheckCircle2, Bot } from "lucide-react";

export default function BotSection() {
  if (!SHOW_BOT_SECTION) return null;

  const alerts = [
    {
      type: "ERRORI DI PREZZO",
      Icon: AlertCircle,
      iconClass: "text-red-400",
      bgClass: "bg-red-500/10",
      example: "Giacca marca X pubblicata a 3,99€ — valore medio: 45€",
      desc: "Il Bot identifica errori umani nella quotazione: chi pubblica non sa il valore reale del capo.",
    },
    {
      type: "ANNUNCI SOTTOPREZZATI",
      Icon: TrendingDown,
      iconClass: "text-viola",
      bgClass: "bg-viola/10",
      example: "Sneaker premium a -75% rispetto al prezzo medio di mercato",
      desc: "Occasioni dove il venditore ha fretta e accetta un margine ridotto.",
    },
    {
      type: "OPPORTUNITÀ DA VALUTARE",
      Icon: CheckCircle2,
      iconClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10",
      example: "Capo di stagione a -85% — 48h di visibilità residua",
      desc: "Alert tempestivi su prodotti con alta probabilità di rivendita rapida.",
    },
  ];

  // Notification icons for the demo panel
  const notifIcons = [
    { Icon: AlertCircle, cls: "text-red-400" },
    { Icon: TrendingDown, cls: "text-viola" },
    { Icon: CheckCircle2, cls: "text-emerald-400" },
  ];

  const notifications = [
    { time: "14:23", msg: "Errore di prezzo — giacca marca X a 3,99€", badge: "URGENTE" },
    { time: "14:31", msg: "Sneaker premium lista a -75% valore medio", badge: "OCCASIONE" },
    { time: "14:47", msg: "Alert capo stagione: -85% · 48h rimaste", badge: "VALUTA" },
  ];

  const flow = ["TROVA", "VALUTA", "ACQUISTA", "RIVENDI"];

  return (
    <section
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

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Left: bot demo panel */}
          <div className="relative">
            <div className="bg-notte border border-viola/20 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(123,47,214,0.2)]">
              {/* Mac-style header bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-bordo bg-superficie/50">
                <div className="w-3 h-3 rounded-full bg-testo/15" />
                <div className="w-3 h-3 rounded-full bg-testo/15" />
                <div className="w-3 h-3 rounded-full bg-testo/15" />
                <div className="flex items-center gap-1.5 ml-2">
                  <Bot className="w-3.5 h-3.5 text-viola" strokeWidth={1.75} />
                  <span className="text-xs text-muted/50 font-poppins">Bot Resellife — Live</span>
                </div>
              </div>
              {/* Notifications */}
              <div className="p-5 space-y-3">
                {notifications.map((n, i) => {
                  const { Icon, cls } = notifIcons[i];
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-superficie border border-bordo rounded-xl p-3 hover:border-viola/30 transition-colors duration-200 cursor-default"
                      onClick={() => trackEvent("bot_notification_click", { index: i })}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <Icon className={`w-5 h-5 ${cls}`} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-testo">Bot Resellife</span>
                          <span className="text-xs text-testo/30">{n.time}</span>
                        </div>
                        <p className="text-xs text-muted/70 leading-snug font-poppins">{n.msg}</p>
                        <span className="mt-1.5 inline-block text-[10px] font-poppins font-semibold bg-viola/15 text-viola rounded-full px-2 py-0.5">
                          {n.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <p className="text-[10px] text-testo/20 text-center font-poppins italic pt-1">
                  ⚠️ Esempi illustrativi — sostituire con screenshot reali (Drive)
                </p>
              </div>
            </div>
          </div>

          {/* Right: alert types */}
          <div className="space-y-5">
            {alerts.map((a, i) => (
              <div
                key={i}
                className="bg-notte border border-bordo rounded-card-lg p-5 hover:border-viola/30 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-xl ${a.bgClass} flex items-center justify-center flex-shrink-0`}>
                    <a.Icon className={`w-5 h-5 ${a.iconClass}`} strokeWidth={2} />
                  </div>
                  <h3 className="font-anton text-base uppercase text-testo tracking-wide">
                    {a.type}
                  </h3>
                </div>
                <p className="text-xs text-viola/80 font-poppins font-medium mb-2 bg-viola/10 rounded-lg px-3 py-1.5">
                  Es: {a.example}
                </p>
                <p className="text-sm text-muted/65 font-poppins leading-relaxed">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Flow diagram */}
        <div className="border-t border-bordo pt-12">
          <p className="text-center text-xs font-poppins font-semibold uppercase tracking-[0.2em] text-muted/40 mb-8">
            Il flusso operativo
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {flow.map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-viola/15 border border-viola/30 flex items-center justify-center shadow-lg shadow-viola/10 hover:bg-viola/25 transition-colors duration-200">
                    <span className="font-anton text-sm text-viola">{i + 1}</span>
                  </div>
                  <p className="font-anton text-xs uppercase text-testo/70 mt-2 tracking-wider">
                    {step}
                  </p>
                </div>
                {i < flow.length - 1 && (
                  <svg
                    aria-hidden
                    className="w-5 h-5 text-viola/40 hidden sm:block"
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
