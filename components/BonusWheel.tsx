"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, Gift, Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// ── Prize definitions ────────────────────────────────────────────────────────
const PRIZES = [
  { id: "guida",      label: "GUIDA DA 0 A 1000",           color: "#7B2FD6", tag: "wheel-guida" },
  { id: "pdf-vinted", label: "PDF STRATEGIE VINTED",         color: "#9347f0", tag: "wheel-pdf-vinted" },
  { id: "fornitori",  label: "BONUS FORNITORI",              color: "#6320b5", tag: "wheel-bonus-fornitori" },
  { id: "checklist",  label: "CHECKLIST AVVIO RESELLING",   color: "#7B2FD6", tag: "wheel-checklist" },
  { id: "test",       label: "TEST RESELLIFE",               color: "#8e3ee0", tag: "wheel-test" },
];

const TOTAL_PRIZES = PRIZES.length;
const SPIN_DURATION = 3400; // ms

// ── Storage helpers ──────────────────────────────────────────────────────────
const SS_WHEEL_SEEN    = "rl_wheel_seen";
const SS_WHEEL_DONE    = "rl_wheel_done";
const SS_EXIT_SHOWN    = "rl_exit_shown";

// ── Main component ────────────────────────────────────────────────────────────
export default function BonusWheel() {
  const [notifVisible, setNotifVisible]   = useState(false);
  const [modalOpen, setModalOpen]         = useState(false);
  const [spinning, setSpinning]           = useState(false);
  const [prizeIndex, setPrizeIndex]       = useState<number | null>(null);
  const [phase, setPhase]                 = useState<"spin"|"reveal"|"form"|"done">("spin");
  const [exitVisible, setExitVisible]     = useState(false);
  const [rotation, setRotation]           = useState(0);
  const [form, setForm]                   = useState({ name: "", email: "", phone: "", privacy: false });
  const [submitting, setSubmitting]       = useState(false);
  const [formError, setFormError]         = useState("");

  const triggeredRef = useRef(false);
  const notifTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ── Trigger logic: time or scroll ─────────────────────────────────────────
  useEffect(() => {
    if (
      sessionStorage.getItem(SS_WHEEL_SEEN) ||
      sessionStorage.getItem(SS_WHEEL_DONE)
    ) return;

    const showNotif = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      sessionStorage.setItem(SS_WHEEL_SEEN, "1");
      setNotifVisible(true);
      trackEvent("bonus_wheel_notif_shown");
    };

    // Time trigger: 25 seconds
    notifTimerRef.current = setTimeout(showNotif, 25000);

    // Scroll trigger: 37% of page
    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= 0.37) showNotif();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ── Exit-intent trigger ───────────────────────────────────────────────────
  useEffect(() => {
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 0) return;
      if (
        sessionStorage.getItem(SS_WHEEL_DONE) ||
        sessionStorage.getItem(SS_EXIT_SHOWN) ||
        modalOpen
      ) return;
      sessionStorage.setItem(SS_EXIT_SHOWN, "1");
      setExitVisible(true);
      trackEvent("bonus_exit_intent_shown");
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [modalOpen]);

  // ── Dismiss notif ────────────────────────────────────────────────────────
  const dismissNotif = () => setNotifVisible(false);

  // ── Open wheel modal ─────────────────────────────────────────────────────
  const openWheel = () => {
    setNotifVisible(false);
    setModalOpen(true);
    setPhase("spin");
    setPrizeIndex(null);
    setRotation(0);
    trackEvent("bonus_wheel_opened");
  };

  // ── Spin logic ───────────────────────────────────────────────────────────
  const spin = useCallback(() => {
    if (spinning || prizeIndex !== null) return;
    setSpinning(true);

    const idx = Math.floor(Math.random() * TOTAL_PRIZES);
    // Each prize occupies 360/5 = 72 degrees
    // We want the needle (top) to point to idx segment
    // Segment i starts at i*(360/N) degrees from 0 (clockwise)
    const segDeg = 360 / TOTAL_PRIZES;
    // Target angle so that prize segment center ends at top (0°)
    // We add extra full rotations for drama
    const extraRotations = 5 * 360;
    // The center of segment idx is at idx * segDeg degrees from top
    const targetAngle = extraRotations + (360 - (idx * segDeg + segDeg / 2));

    setRotation(prev => prev + targetAngle);
    trackEvent("bonus_wheel_spin", { prize: PRIZES[idx].id });

    setTimeout(() => {
      setSpinning(false);
      setPrizeIndex(idx);
      setPhase("reveal");
      setTimeout(() => setPhase("form"), 2200);
    }, SPIN_DURATION + 200);
  }, [spinning, prizeIndex]);

  // ── Form submit ──────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacy) { setFormError("Accetta l'informativa sulla privacy per continuare."); return; }
    if (!form.email.includes("@")) { setFormError("Inserisci un'email valida."); return; }
    setFormError("");
    setSubmitting(true);

    const prize = prizeIndex !== null ? PRIZES[prizeIndex] : null;

    try {
      // Mailchimp / webhook integration point — same endpoint as LeadForm
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "https://httpbin.org/post";
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          tag: prize?.tag,
          prize: prize?.label,
          source: "bonus_wheel",
        }),
      });
      trackEvent("bonus_wheel_submitted", { prize: prize?.id ?? "" });
    } catch (_) {
      // silent fail — don't block UX
    }

    sessionStorage.setItem(SS_WHEEL_DONE, "1");
    setSubmitting(false);
    setPhase("done");
  };

  // ── SVG Wheel ─────────────────────────────────────────────────────────────
  const WheelSVG = () => {
    const cx = 150, cy = 150, r = 138;
    const segAngle = (2 * Math.PI) / TOTAL_PRIZES;

    const segments = PRIZES.map((prize, i) => {
      const startAngle = i * segAngle - Math.PI / 2;
      const endAngle   = startAngle + segAngle;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const midAngle = startAngle + segAngle / 2;
      const tx = cx + r * 0.62 * Math.cos(midAngle);
      const ty = cy + r * 0.62 * Math.sin(midAngle);

      return (
        <g key={prize.id}>
          <path
            d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
            fill={prize.color}
            stroke="#0D0714"
            strokeWidth="2"
          />
          <text
            x={tx}
            y={ty}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="9.5"
            fontFamily="Anton, sans-serif"
            fontWeight="400"
            letterSpacing="0.05em"
            transform={`rotate(${(midAngle * 180) / Math.PI + 90}, ${tx}, ${ty})`}
          >
            {prize.label.split(" ").map((word, wi) => (
              <tspan key={wi} x={tx} dy={wi === 0 ? `-${(prize.label.split(" ").length - 1) * 6}` : "13"}>
                {word}
              </tspan>
            ))}
          </text>
        </g>
      );
    });

    return (
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full drop-shadow-[0_0_40px_rgba(123,47,214,0.5)]"
        aria-hidden
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning
            ? `transform ${SPIN_DURATION}ms cubic-bezier(0.15, 0.8, 0.4, 1)`
            : "none",
        }}
      >
        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke="#FF1FA8" strokeWidth="3" strokeDasharray="8 6" />
        {segments}
        {/* Center hub */}
        <circle cx={cx} cy={cy} r={22} fill="#0D0714" stroke="#7B2FD6" strokeWidth="3" />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fill="#7B2FD6" fontSize="9" fontFamily="Anton, sans-serif">GIRA</text>
      </svg>
    );
  };

  // ── Needle ────────────────────────────────────────────────────────────────
  const Needle = () => (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10 pointer-events-none" aria-hidden>
      <svg width="20" height="30" viewBox="0 0 20 30">
        <polygon points="10,0 0,30 20,30" fill="#FF1FA8" />
      </svg>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Notification pill ────────────────────────────── */}
      {notifVisible && (
        <div
          role="alert"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 bg-notte/95 backdrop-blur-md border border-viola/50 rounded-full pl-4 pr-2 py-2 shadow-[0_4px_24px_rgba(123,47,214,0.35)] animate-[slideUp_0.4s_ease-out_both]"
        >
          <Gift className="w-4 h-4 text-viola flex-shrink-0" strokeWidth={2} aria-hidden />
          <span className="text-sm font-poppins font-medium text-testo whitespace-nowrap">
            🎁 Hai un bonus da sbloccare
          </span>
          <button
            onClick={openWheel}
            className="ml-1 px-3 py-1.5 rounded-full bg-viola text-testo text-xs font-poppins font-semibold hover:bg-viola-hover transition-colors"
            aria-label="Sblocca il bonus"
          >
            Scopri
          </button>
          <button
            onClick={dismissNotif}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-testo/50 hover:text-testo"
            aria-label="Chiudi notifica"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* ── Wheel modal ──────────────────────────────────── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resellife Bonus Wheel"
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => {}}
            aria-hidden
          />

          <div className="relative z-10 w-full max-w-md bg-notte border border-viola/40 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(123,47,214,0.4)]">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#1a0835] to-notte px-6 pt-6 pb-4 border-b border-viola/20">
              <p className="text-xs font-poppins font-semibold uppercase tracking-[0.2em] text-viola mb-1">Resellife Bonus</p>
              <h2 className="font-anton text-2xl uppercase text-testo">
                {phase === "done" ? "BONUS INVIATO!" : "GIRA LA RUOTA"}
              </h2>
              <button
                onClick={() => { setModalOpen(false); setPhase("spin"); setPrizeIndex(null); setRotation(0); }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 transition-colors text-testo/60 hover:text-testo"
                aria-label="Chiudi"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            <div className="p-6">
              {/* ─ SPIN PHASE ─ */}
              {(phase === "spin" || spinning) && (
                <>
                  <div className="relative w-64 h-64 mx-auto mb-6">
                    <Needle />
                    <WheelSVG />
                  </div>
                  <button
                    onClick={spin}
                    disabled={spinning}
                    className="w-full py-4 rounded-btn bg-viola text-testo font-poppins font-bold text-lg uppercase tracking-wide hover:bg-viola-hover transition-all hover:scale-[1.02] active:scale-[0.99] shadow-lg shadow-viola/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {spinning ? "Girando..." : "GIRA →"}
                  </button>
                  <p className="text-center text-xs text-testo/30 font-poppins mt-3">
                    Un solo giro — premi reali, nessun valore monetario
                  </p>
                </>
              )}

              {/* ─ REVEAL PHASE ─ */}
              {phase === "reveal" && prizeIndex !== null && !spinning && (
                <div className="text-center py-4 animate-[slideUp_0.4s_ease-out_both]">
                  <div className="w-20 h-20 rounded-full bg-viola/20 border-2 border-viola flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-9 h-9 text-viola" strokeWidth={1.5} />
                  </div>
                  <p className="text-viola font-poppins font-semibold text-sm uppercase tracking-widest mb-2">Hai sbloccato</p>
                  <h3 className="font-anton text-2xl uppercase text-testo leading-tight">
                    {PRIZES[prizeIndex].label}
                  </h3>
                </div>
              )}

              {/* ─ FORM PHASE ─ */}
              {phase === "form" && prizeIndex !== null && (
                <div className="animate-[slideUp_0.3s_ease-out_both]">
                  <p className="font-poppins font-semibold text-testo text-sm mb-1">
                    Hai sbloccato: <span className="text-viola">{PRIZES[prizeIndex].label}</span>
                  </p>
                  <p className="text-muted/60 font-poppins text-xs mb-5">Dove te lo mandiamo?</p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nome"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-superficie border border-bordo rounded-lg px-4 py-3 text-sm font-poppins text-testo placeholder-muted/40 focus:outline-none focus:border-viola transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-superficie border border-bordo rounded-lg px-4 py-3 text-sm font-poppins text-testo placeholder-muted/40 focus:outline-none focus:border-viola transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp (opzionale)"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-superficie border border-bordo rounded-lg px-4 py-3 text-sm font-poppins text-testo placeholder-muted/40 focus:outline-none focus:border-viola transition-colors"
                    />
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.privacy}
                        onChange={e => setForm(f => ({ ...f, privacy: e.target.checked }))}
                        className="mt-0.5 accent-viola flex-shrink-0"
                      />
                      <span className="text-xs text-muted/60 font-poppins leading-relaxed">
                        Accetto il trattamento dei dati personali come da{" "}
                        <a href="/informativa-sulla-privacy" className="text-viola hover:underline" target="_blank" rel="noopener">
                          informativa sulla privacy
                        </a>.
                      </span>
                    </label>

                    {formError && (
                      <p className="text-xs text-red-400 font-poppins">{formError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-btn bg-viola text-testo font-poppins font-bold text-sm uppercase tracking-wide hover:bg-viola-hover transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <Send className="w-4 h-4" strokeWidth={2} />
                      {submitting ? "Invio in corso..." : "RICEVI IL BONUS →"}
                    </button>
                  </form>
                </div>
              )}

              {/* ─ DONE PHASE ─ */}
              {phase === "done" && (
                <div className="text-center py-6 animate-[slideUp_0.4s_ease-out_both]">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h3 className="font-anton text-2xl uppercase text-testo mb-3">INVIATO!</h3>
                  <p className="text-muted/70 font-poppins text-sm leading-relaxed mb-5">
                    Ti mandiamo il tuo bonus entro pochi minuti.<br />
                    Controlla la posta (anche spam).
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-3 rounded-btn border border-bordo text-testo/60 font-poppins text-sm hover:border-viola/40 hover:text-testo transition-all"
                  >
                    Chiudi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Exit-intent popup ─────────────────────────────── */}
      {exitVisible && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Prima di andare"
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />
          <div className="relative z-10 w-full max-w-sm bg-notte border border-viola/30 rounded-2xl p-6 shadow-[0_0_60px_rgba(123,47,214,0.3)]">
            <button
              onClick={() => setExitVisible(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-testo/50"
              aria-label="Chiudi"
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <p className="text-viola font-poppins font-semibold text-xs uppercase tracking-widest mb-2">Prima di andare</p>
            <h3 className="font-anton text-2xl uppercase text-testo mb-3">
              VUOI LA GUIDA<br />
              <span className="text-viola">GRATUITA?</span>
            </h3>
            <p className="text-muted/60 font-poppins text-sm mb-5">
              La guida "Da 0 a 1000" — come iniziare nel reselling da zero.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                try {
                  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "https://httpbin.org/post";
                  await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: fd.get("email"),
                      source: "exit_intent",
                      tag: "exit-guida",
                    }),
                  });
                  trackEvent("exit_intent_submitted");
                } catch (_) {}
                setExitVisible(false);
              }}
              className="space-y-3"
            >
              <input
                name="email"
                type="email"
                placeholder="La tua email"
                required
                className="w-full bg-superficie border border-bordo rounded-lg px-4 py-3 text-sm font-poppins text-testo placeholder-muted/40 focus:outline-none focus:border-viola transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-btn bg-viola text-testo font-poppins font-bold text-sm uppercase tracking-wide hover:bg-viola-hover transition-all"
              >
                RICEVI LA GUIDA →
              </button>
              <p className="text-center text-[10px] text-testo/30 font-poppins">
                Nessuno spam. Puoi cancellarti in qualsiasi momento.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
