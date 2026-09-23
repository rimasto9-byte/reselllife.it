"use client";

import { useEffect, useRef, useState } from "react";
import { Package, Bot, BookOpen, Users, Headphones } from "lucide-react";

const pillars = [
  {
    id: "fornitori",
    Icon: Package,
    label: "FORNITORI VERIFICATI",
    desc: "Contatti reali e testati, non liste generiche trovate online.",
    accent: "border-viola/30 hover:border-viola/60",
    iconBg: "bg-viola/10 text-viola",
    delay: 0,
    // Replace: <Image src="/images/academy-fornitori.png" ... />
    media: "PDF/catalogo fornitori",
  },
  {
    id: "bot",
    Icon: Bot,
    label: "BOT RESELLIFE",
    desc: "Il tuo radar sul mercato, attivo 24 ore su 24.",
    accent: "border-accento/25 hover:border-accento/50",
    iconBg: "bg-accento/10 text-accento",
    delay: 100,
    media: "Dashboard Bot (screenshot reale)",
  },
  {
    id: "guide",
    Icon: BookOpen,
    label: "GUIDE OPERATIVE",
    desc: 'PDF pratici, dalla guida "Da 0 a 1000" alle strategie avanzate.',
    accent: "border-viola/20 hover:border-viola/50",
    iconBg: "bg-viola/10 text-viola",
    delay: 200,
    media: "Mockup guida PDF",
  },
  {
    id: "community",
    Icon: Users,
    label: "COMMUNITY PRIVATA",
    desc: "700+ persone che stanno facendo la stessa cosa.",
    accent: "border-bordo hover:border-viola/40",
    iconBg: "bg-viola/8 text-viola",
    delay: 300,
    media: "Screenshot WhatsApp/Telegram",
  },
  {
    id: "supporto",
    Icon: Headphones,
    label: "SUPPORTO DIRETTO",
    desc: "Rispondiamo noi, non un bot di assistenza.",
    accent: "border-bordo hover:border-viola/40",
    iconBg: "bg-viola/8 text-viola",
    delay: 400,
    media: "Foto del team",
  },
];

export default function Ecosistema() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array(pillars.length).fill(false)
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          pillars.forEach((p, i) => {
            setTimeout(() => {
              setVisibleItems(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, p.delay);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ecosistema"
      aria-labelledby="ecosistema-heading"
      className="py-16 lg:py-28 bg-notte relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[60vw] h-[60vh] rounded-full bg-viola/5 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-viola font-poppins font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            L&apos;ecosistema
          </p>
          <h2
            id="ecosistema-heading"
            className="font-anton text-[clamp(2rem,5vw,3.5rem)] uppercase text-testo leading-none mb-4"
          >
            COSA C&apos;È DENTRO
            <br />
            <span className="text-viola">RESELLIFE ACADEMY</span>
          </h2>
          <p className="text-muted/70 font-poppins max-w-xl mx-auto leading-relaxed">
            Non un corso. Un ecosistema completo di strumenti, persone e risorse
            operative.
          </p>
        </div>

        {/* Dashboard-style asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {pillars.map((p, i) => (
            <div
              key={p.id}
              id={`ecosistema-${p.id}`}
              style={{
                opacity: visibleItems[i] ? 1 : 0,
                transform: visibleItems[i] ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${p.delay}ms, transform 0.5s ease ${p.delay}ms`,
              }}
              className={`bg-superficie border ${p.accent} rounded-card-lg p-6 transition-colors duration-300 group cursor-default ${
                // Make bot card span 2 columns on md+
                p.id === "bot" ? "lg:col-span-2" : ""
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${p.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                aria-hidden
              >
                <p.Icon className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-anton text-lg uppercase text-testo mb-2 tracking-wide">
                {p.label}
              </h3>
              <p className="text-muted/65 text-sm font-poppins leading-relaxed">
                {p.desc}
              </p>
              {/* Asset note — dev-only, replace with real <Image> from Drive */}
              <p className="mt-3 text-[10px] text-testo/15 font-poppins italic">
                Media: {p.media}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
