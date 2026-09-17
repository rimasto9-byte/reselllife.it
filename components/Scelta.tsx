"use client";

import Link from "next/link";
import { ACADEMY_URL, FORNITORI_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

export default function Scelta() {
  return (
    <section
      id="scelta"
      aria-labelledby="scelta-heading"
      className="py-20 lg:py-28 bg-notte"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="scelta-heading"
          className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-center text-testo mb-14"
        >
          DA DOVE VUOI PARTIRE?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_0.6fr] gap-6 lg:gap-8 items-start max-w-5xl mx-auto">
          {/* ── Card primaria: Academy ── */}
          <div className="bg-[rgba(91,63,232,0.12)] border border-viola rounded-card-lg p-8 lg:p-10 flex flex-col gap-6">
            {/* Recommended badge */}
            <div className="inline-flex items-center gap-1.5 bg-viola/20 border border-viola/30 rounded-full px-3 py-1 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-viola inline-block" />
              <span className="text-xs font-medium text-viola uppercase tracking-wider">
                Consigliato
              </span>
            </div>

            <div>
              <h3 className="font-anton text-3xl lg:text-4xl uppercase text-testo mb-3">
                ENTRA IN ACADEMY
              </h3>
              <p className="text-testo/65 leading-relaxed">
                Il metodo completo, gli strumenti e il supporto. Tutto in un
                posto solo.
              </p>
            </div>

            <ul className="space-y-2.5 text-sm text-testo/70">
              {[
                "Fornitori privati testati",
                "Bot Resellife incluso",
                "Guide pratiche PDF",
                "Community 700+ ragazzi",
                "Supporto diretto",
                "Guida bonus bancari",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-viola/20 border border-viola/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-viola text-[10px]">✓</span>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="border-t border-viola/20 pt-5">
              <p className="text-3xl font-anton text-testo">
                90€{" "}
                <span className="text-base font-inter font-normal text-testo/40">
                  accesso completo
                </span>
              </p>
            </div>

            {/* CTA — real URL, build fails if missing */}
            <a
              href={ACADEMY_URL}
              onClick={() => trackEvent("academy_click")}
              className="block w-full py-4 px-6 rounded-btn bg-accento text-testo font-anton uppercase text-xl tracking-wide text-center hover:bg-accento-hover transition-all hover:scale-[1.02] active:scale-[0.99] shadow-lg shadow-accento/20"
              rel="noopener"
            >
              INIZIA IL PERCORSO
            </a>
          </div>

          {/* ── Divider — "o" ── */}
          <div className="hidden lg:flex flex-col items-center justify-center py-10">
            <div className="h-20 w-px bg-bordo" />
            <span className="my-4 text-testo/30 text-sm font-medium">o</span>
            <div className="h-20 w-px bg-bordo" />
          </div>

          {/* ── Card secondaria: Fornitore ── */}
          <div className="bg-superficie border border-bordo rounded-card p-6 flex flex-col gap-5">
            <div>
              <h3 className="font-anton text-2xl uppercase text-testo mb-2">
                NON SEI ANCORA PRONTO?
              </h3>
              <p className="text-testo/55 text-sm leading-relaxed">
                Parti da un singolo fornitore testato, senza impegno.
              </p>
            </div>

            <ul className="space-y-2 text-sm text-testo/60">
              {["Accesso a un fornitore singolo", "Nessun abbonamento"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-testo/30 text-xs">–</span>
                    {item}
                  </li>
                )
              )}
            </ul>

            <Link
              href={FORNITORI_URL}
              onClick={() => trackEvent("fornitore_click")}
              className="block w-full py-3 px-5 rounded-btn border border-viola text-viola font-medium text-sm text-center hover:bg-viola/10 transition-colors duration-200"
            >
              Vedi i fornitori disponibili
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
