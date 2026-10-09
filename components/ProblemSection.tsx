"use client";

import { motion, useReducedMotion } from "motion/react";
import { XCircle, ArrowRight, AlertTriangle, ArrowDown } from "lucide-react";
import { QUIZ_URL } from "@/lib/config";

const problems = [
  {
    title: "Non sai cosa vendere",
    desc: "Senza una ricerca basata sui dati reali, rischi di comprare merce che resta invenduta per mesi.",
    stat: "Mesi",
    statLabel: "di merce invenduta",
  },
  {
    title: "Non sai dove comprare",
    desc: "I fornitori pubblici sul web hanno troppa concorrenza e margini ridotti all'osso.",
    stat: "Margini",
    statLabel: "ridotti all'osso",
  },
  {
    title: "Non sai come trovare gli affari",
    desc: "Gli affari migliori spariscono in pochissimi secondi senza uno strumento automatico di notifica.",
    stat: "Pochi secondi",
    statLabel: "e l'affare sparisce",
  },
];

const WORDS_1 = ["IL", "PROBLEMA", "NON", "È", "INIZIARE."];
const WORDS_2 = ["È", "INIZIARE", "SENZA", "METODO."];

export default function ProblemSection() {
  const reduce = useReducedMotion();

  const word = {
    hidden: { opacity: 0, y: "60%", rotate: 4 },
    show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      id="problema"
      aria-labelledby="problema-heading"
      data-fx-skip
      className="py-16 lg:py-28 relative overflow-hidden"
    >
      <div aria-hidden className="rl-aurora top-1/3 -left-32 w-[420px] h-[420px] bg-fuchsia-600/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Colonna sinistra */}
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rl-chip mb-5 !text-fuchsia-300 !border-fuchsia-400/40"
            >
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden />
              Perché molti mollano subito
            </motion.div>

            <motion.h2
              id="problema-heading"
              initial={reduce ? "show" : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ staggerChildren: 0.07 }}
              className="font-anton uppercase mb-8 text-white"
              aria-label="Il problema non è iniziare. È iniziare senza metodo."
            >
              <span aria-hidden className="block">
                {WORDS_1.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                    <motion.span variants={word} className={`inline-block ${i >= 2 ? "text-white/45" : ""}`}>
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
              <span aria-hidden className="block mt-1">
                {WORDS_2.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                    <motion.span variants={word} className="inline-block rl-grad-text">
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
            </motion.h2>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-white/80 font-poppins leading-relaxed text-base mb-8 max-w-xl"
            >
              La maggior parte delle persone parte per tentativi, perdendo tempo e soldi in acquisti
              sbagliati. Senza fornitori verificati e strumenti adeguati, il reselling diventa una{" "}
              <strong className="text-white">lotteria</strong>.
            </motion.p>

            <a
              href={QUIZ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-btn bg-viola text-white font-poppins text-sm px-6"
            >
              <span>Evita questi errori con il quiz</span>
              <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
          </div>

          {/* Colonna destra: errori che si accumulano */}
          <div className="space-y-4 relative">
            {problems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="rl-card group relative p-5 sm:p-6 overflow-hidden"
              >
                {/* numero gigante sullo sfondo */}
                <span
                  aria-hidden
                  className="absolute -right-2 -top-4 font-anton text-[7rem] leading-none text-white/[0.05] select-none"
                >
                  0{i + 1}
                </span>

                <div className="relative flex items-start gap-4">
                  <motion.div
                    animate={reduce ? undefined : { rotate: [0, -8, 8, -6, 6, 0] }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.25, repeat: Infinity, repeatDelay: 4 }}
                    className="w-11 h-11 rounded-xl bg-fuchsia-500/15 border border-fuchsia-400/40 grid place-items-center shrink-0"
                  >
                    <XCircle className="w-5 h-5 text-fuchsia-300" aria-hidden />
                  </motion.div>
                  <div className="min-w-0">
                    <h3 className="font-anton text-lg sm:text-xl uppercase text-white mb-1.5">{item.title}</h3>
                    <p className="font-poppins text-sm text-white/70 leading-relaxed">{item.desc}</p>
                    <p className="mt-3 inline-flex items-baseline gap-2 text-xs font-poppins uppercase tracking-wider text-fuchsia-300">
                      <b className="font-anton text-base normal-case tracking-normal text-white">{item.stat}</b>
                      {item.statLabel}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 pt-2 text-sm font-poppins font-semibold text-violet-300"
            >
              <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden />
              Esiste un modo più semplice
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
