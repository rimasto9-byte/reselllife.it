import { ShieldCheck, Wallet, MessageCircle, Bot } from "lucide-react";
import { ACADEMY_URL } from "@/lib/config";

// Solo fatti già presenti nel sito (prezzo, nessun abbonamento, supporto, Bot incluso).
const POINTS = [
  { icon: Wallet, title: "Pagamento unico", text: "90€ una volta sola. Nessun abbonamento, nessun costo nascosto." },
  { icon: Bot, title: "Bot incluso", text: "L'accesso al Bot Resellife è compreso nell'Academy." },
  { icon: MessageCircle, title: "Supporto diretto", text: "Ti rispondiamo su WhatsApp, non a un ticket anonimo." },
];

export default function ZeroRischio() {
  return (
    <section id="zero-rischio" aria-labelledby="zero-rischio-h" className="py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="rl-chip mb-4">
            <ShieldCheck className="w-4 h-4 text-viola" aria-hidden /> Parti senza rischi
          </span>
          <h2
            id="zero-rischio-h"
            data-reveal
            className="font-anton text-[clamp(2rem,6vw,3.5rem)] uppercase text-white leading-[0.95]"
          >
            Sai già cosa ottieni, <span className="rl-grad-text">prima di pagare.</span>
          </h2>
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, text }) => (
            <li key={title} data-reveal className="rl-card p-6">
              <div className="w-11 h-11 rounded-xl bg-viola/20 border border-viola/40 grid place-items-center mb-4">
                <Icon className="w-5 h-5 text-viola" aria-hidden />
              </div>
              <h3 className="font-anton text-xl uppercase text-white mb-2">{title}</h3>
              <p className="font-poppins text-sm text-white/70 leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href={ACADEMY_URL}
            rel="noopener"
            className="inline-block py-4 px-8 rounded-btn bg-viola text-white font-poppins font-bold text-base uppercase tracking-wide"
          >
            ENTRA IN ACADEMY →
          </a>
        </div>
      </div>
    </section>
  );
}
