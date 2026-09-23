"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { MapPin, Globe, FileText, ChevronRight } from "lucide-react";

const highlights = [
  {
    Icon: MapPin,
    label: "Bundle Fornitori Italiani",
    desc: "Contatti verificati, prezzi di ingresso, categorie di prodotto",
    iconClass: "text-viola",
    iconBg: "bg-viola/10",
  },
  {
    Icon: Globe,
    label: "Bundle Fornitori Internazionali",
    desc: "Accesso a mercati esteri con margini più alti",
    iconClass: "text-viola",
    iconBg: "bg-viola/10",
  },
  {
    Icon: FileText,
    label: "Guida operativa",
    desc: "Come approcciare ogni fornitore e negoziare",
    iconClass: "text-viola",
    iconBg: "bg-viola/10",
  },
];

export default function FornitoriSection() {
  return (
    <section
      id="fornitori"
      aria-labelledby="fornitori-heading"
      className="py-16 lg:py-28 bg-notte relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-[#0D0714] via-[#12082a] to-[#0D0714] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/2 right-0 w-[50vw] h-[70%] -translate-y-1/2 rounded-full bg-viola/6 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: bundle cards */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="space-y-4">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="bg-superficie border border-bordo rounded-card-lg p-5 flex items-center gap-4 hover:border-viola/40 transition-all duration-200 group"
                    style={{
                      transform:
                        i === 1
                          ? "translateX(2rem)"
                          : i === 2
                          ? "translateX(1rem)"
                          : "none",
                    }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${h.iconBg} border border-viola/20 flex items-center justify-center flex-shrink-0 group-hover:bg-viola/20 transition-colors duration-200`}
                    >
                      <h.Icon
                        className={`w-5 h-5 ${h.iconClass}`}
                        strokeWidth={1.75}
                      />
                    </div>
                    <div>
                      <p className="font-poppins font-semibold text-testo text-sm">
                        {h.label}
                      </p>
                      <p className="text-muted/60 text-xs font-poppins mt-0.5">
                        {h.desc}
                      </p>
                    </div>
                    <div className="ml-auto text-viola/40 group-hover:text-viola/70 transition-colors">
                      <ChevronRight className="w-4 h-4" strokeWidth={2} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: copy */}
          <div className="order-1 lg:order-2">
            <p className="text-viola font-poppins font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              I fornitori
            </p>
            <h2
              id="fornitori-heading"
              className="font-anton text-[clamp(2rem,5vw,3.5rem)] uppercase text-testo leading-none mb-6"
            >
              NON PARTI DA ZERO.
              <br />
              <span className="text-viola">PARTI DA UNA BASE.</span>
            </h2>
            <p className="text-muted/75 font-poppins leading-relaxed mb-8 max-w-lg">
              Accedi ai nostri fornitori e alle risorse operative già organizzate
              per aiutarti a capire cosa acquistare, dove acquistare e come
              iniziare a testare il mercato.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/fornitori"
                onClick={() => trackEvent("fornitori_section_cta")}
                className="inline-block py-4 px-6 rounded-btn bg-viola text-testo font-poppins font-semibold text-sm text-center hover:bg-viola-hover transition-all hover:scale-[1.02] shadow-lg shadow-viola/25"
              >
                SCOPRI I FORNITORI →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
