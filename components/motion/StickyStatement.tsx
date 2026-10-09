"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ShoppingBag, Tag, Repeat2, ArrowRight } from "lucide-react";

const STEPS = [
  { icon: ShoppingBag, label: "Compri bene" },
  { icon: Tag, label: "Vendi meglio" },
  { icon: Repeat2, label: "Reinvesti" },
];

const TAGS = ["Fornitori testati", "Bot che lavora per te", "Community"];

export default function StickyStatement() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  // il ciclo evidenzia un passo alla volta, all'infinito
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 1600);
    return () => clearInterval(id);
  }, [reduce]);

  const rise = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section
      id="sticky-statement"
      aria-label="Non è fortuna. È un processo."
      className="py-20 sm:py-28 text-white relative overflow-hidden"
    >
      <div
        aria-hidden
        className="rl-aurora top-1/4 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-violet-600/30"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* "NON È FORTUNA" con tratto che cancella la parola */}
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="font-anton uppercase leading-none"
        >
          <motion.span custom={0} variants={rise} className="block text-white/50 relative w-fit mx-auto">
            Non è fortuna
            <motion.span
              aria-hidden
              className="absolute left-0 top-1/2 h-[6px] w-full origin-left rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500"
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { delay: 0.9, duration: 0.6, ease: "easeInOut" } },
              }}
            />
          </motion.span>
          <motion.span custom={4} variants={rise} className="block mt-3 rl-grad-text">
            È un processo.
          </motion.span>
        </motion.h2>

        {/* ciclo animato */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-2"
          role="list"
          aria-label="Il processo"
        >
          {STEPS.map(({ icon: Icon, label }, i) => {
            const on = reduce || i === active;
            return (
              <div key={label} role="listitem" className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2">
                <motion.div
                  animate={{ scale: on && !reduce ? 1.06 : 1, opacity: on ? 1 : 0.5 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl border w-full sm:w-auto ${
                    on
                      ? "bg-viola/25 border-viola shadow-[0_0_40px_-8px_rgba(168,85,247,0.8)]"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <span className="w-10 h-10 rounded-xl bg-viola/30 grid place-items-center">
                    <Icon className="w-5 h-5 text-white" aria-hidden />
                  </span>
                  <span className="font-anton uppercase text-lg tracking-tight">{label}</span>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="w-5 h-5 text-viola rotate-90 sm:rotate-0 shrink-0"
                  />
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 font-poppins text-white/70 text-sm uppercase tracking-[0.2em]">Ogni giorno</p>

        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {TAGS.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="rl-chip"
            >
              ✓ {t}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
