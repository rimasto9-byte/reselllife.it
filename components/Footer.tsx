import Link from "next/link";
import { INSTAGRAM_URL, TIKTOK_URL, WHATSAPP_URL } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-superficie border-t border-bordo pt-12 pb-8"
      aria-label="Footer Resellife Academy"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="font-anton text-2xl uppercase text-testo mb-3">
              Resellife Academy
            </p>
            <p className="text-sm text-testo/50 leading-relaxed max-w-xs">
              Il metodo, i fornitori testati e il Bot Resellife per costruirti
              un extra mensile con il reselling.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-testo/40 mb-4">
              Naviga
            </p>
            <ul className="space-y-2.5 text-sm text-testo/60">
              {[
                { href: "#metodo", label: "Come funziona" },
                { href: "#ecosistema", label: "L'Academy" },
                { href: "#bot", label: "Bot Resellife" },
                { href: "#scelta", label: "Prezzi" },
                { href: "#faq", label: "FAQ" },
                { href: "/fornitori", label: "Fornitori" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-testo transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contacts */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-testo/40 mb-4">
              Legale e contatti
            </p>
            <ul className="space-y-2.5 text-sm text-testo/60">
              {[
                {
                  href: "/informativa-sulla-privacy",
                  label: "Informativa sulla privacy",
                },
                {
                  href: "/informativa-sui-cookie",
                  label: "Informativa sui cookie",
                },
                {
                  href: "/condizioni-generali",
                  label: "Condizioni generali",
                },
                { href: WHATSAPP_URL, label: "WhatsApp", external: true },
                { href: INSTAGRAM_URL, label: "Instagram", external: true },
                { href: TIKTOK_URL, label: "TikTok", external: true },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="hover:text-testo transition-colors duration-150"
                    {...(l.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Dati fiscali obbligatori (D.Lgs 70/2003 + Codice del Consumo) ── */}
        <div className="border-t border-bordo pt-6 space-y-1">
          {/* PLACEHOLDER — compilare con i dati reali prima del lancio */}
          <p className="text-xs text-testo/40">
            <span className="text-yellow-500/70">[RAGIONE SOCIALE]</span> —
            P. IVA{" "}
            <span className="text-yellow-500/70">[NUMERO P. IVA]</span>
          </p>
          <p className="text-xs text-testo/40">
            Sede legale:{" "}
            <span className="text-yellow-500/70">[INDIRIZZO COMPLETO]</span>
          </p>
          <p className="text-xs text-testo/40">
            Email:{" "}
            <span className="text-yellow-500/70">[EMAIL DI CONTATTO]</span>
          </p>

          <p className="text-xs text-testo/30 pt-3">
            © {year} Resellife. Tutti i diritti riservati.
            <br />
            I risultati mostrati sono esempi reali ma non tipici. I risultati
            variano da persona a persona.
          </p>
        </div>
      </div>
    </footer>
  );
}
