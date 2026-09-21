"use client";

import { trackEvent } from "@/lib/analytics";
import { QUIZ_URL } from "@/lib/config";

export default function QuizSection() {
  return (
    <section
      id="quiz"
      aria-labelledby="quiz-heading"
      className="py-16 lg:py-28 bg-notte relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-viola/10 via-notte to-notte pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[60vh] rounded-full bg-viola/8 blur-[150px] pointer-events-none"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Label */}
        <div className="inline-flex items-center gap-2 bg-viola/15 border border-viola/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-viola inline-block animate-pulse" />
          <span className="text-xs font-poppins font-medium text-viola uppercase tracking-wider">
            Gratuito · 60 secondi
          </span>
        </div>

        <h2
          id="quiz-heading"
          className="font-anton text-[clamp(2.5rem,7vw,5rem)] uppercase leading-none text-testo mb-4"
        >
          IL RESELL
          <br />
          <span className="text-viola">FA PER TE?</span>
        </h2>

        <p className="text-muted/70 font-poppins text-lg leading-relaxed mb-3">
          Scoprilo in 60 secondi.
        </p>
        <p className="text-muted/50 font-poppins text-sm leading-relaxed max-w-lg mx-auto mb-10">
          Capisci da dove partire, quale approccio può essere più adatto alla
          tua situazione e quali errori evitare.
        </p>

        {/* Big CTA */}
        <a
          href={QUIZ_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("quiz_click_section")}
          id="cta-quiz-section"
          className="inline-block py-5 px-12 rounded-btn bg-viola text-testo font-poppins font-bold text-xl uppercase tracking-wide hover:bg-viola-hover transition-all hover:scale-[1.03] active:scale-[0.99] shadow-[0_0_40px_rgba(123,47,214,0.5)] hover:shadow-[0_0_60px_rgba(123,47,214,0.7)]"
        >
          INIZIA IL QUIZ →
        </a>

        <p className="mt-4 text-xs text-testo/30 font-poppins">
          Gratis. Nessuna email richiesta. Risultato immediato.
        </p>
      </div>
    </section>
  );
}
