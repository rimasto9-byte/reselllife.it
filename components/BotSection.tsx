import { SHOW_BOT_SECTION } from "@/lib/config";
import { Bot } from "lucide-react";

export default function BotSection() {
  if (!SHOW_BOT_SECTION) return null;

  return (
    <section
      id="bot"
      aria-labelledby="bot-heading"
      className="py-20 lg:py-28 bg-notte relative overflow-hidden"
    >
      {/* Subtle glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-viola/5 via-transparent to-transparent pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <h2
              id="bot-heading"
              className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-testo leading-none mb-6"
            >
              IL BOT CHE CERCA PER TE,
              <br />
              <span className="text-viola">24 ORE SU 24</span>
            </h2>

            <p className="text-testo/65 leading-relaxed mb-8 max-w-lg">
              Il Bot Resellife scansiona il mercato in continuazione e ti
              segnala occasioni sottovalutate e prodotti pubblicati sotto il
              loro valore reale. Tu non passi le giornate a cercare: quando
              c&apos;è qualcosa che vale, arriva una notifica.
            </p>

            <a
              href="#scelta"
              className="inline-block font-medium text-viola underline underline-offset-4 hover:text-viola-hover transition-colors text-sm"
            >
              Scopri come funziona nell&apos;Academy
            </a>
          </div>

          {/* Screenshots — 3 only, not 9 */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-superficie border border-bordo rounded-[16px] overflow-hidden shadow-[0_4px_24px_rgba(91,63,232,0.12)]"
                aria-label={`Esempio notifica Bot Resellife ${n}`}
              >
                {/* Placeholder for real bot screenshots */}
                <div className="h-24 bg-gradient-to-r from-superficie to-[#1A1A1A] flex items-center px-5 gap-4">
                  <div className="w-10 h-10 rounded-full bg-viola/20 border border-viola/30 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-testo/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-testo">
                        Bot Resellife
                      </span>
                      <span className="text-xs text-testo/30">adesso</span>
                    </div>
                    <p className="text-xs text-testo/60 leading-snug truncate">
                      {
                        [
                          "🔴 Errore di prezzo rilevato — giacca marca X a 3,99€",
                          "💰 Occasione trovata: sneaker lista sotto valore reale",
                          "✅ Alert: capo di stagione a -85% rispetto al prezzo medio",
                        ][n - 1]
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Note: replace with real screenshots when available */}
            <p className="text-xs text-testo/30 text-center mt-2">
              Esempi illustrativi — sostituire con screenshot reali prima del
              lancio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
