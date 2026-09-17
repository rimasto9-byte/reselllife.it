import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Informativa sui Cookie | Resellife Academy",
  description:
    "Informativa sull'uso dei cookie su resellife.it ai sensi del GDPR e delle linee guida del Garante Privacy italiano.",
};

export default function CookiePage() {
  return (
    <main className="min-h-screen bg-notte py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-block mb-8 text-sm text-viola hover:text-viola-hover underline underline-offset-2"
        >
          ← Torna alla home
        </Link>

        <h1 className="font-anton text-4xl uppercase text-testo mb-8">
          Informativa sui Cookie
        </h1>

        <div className="space-y-6 text-sm text-testo/70 leading-relaxed">
          <p className="text-xs text-testo/40">
            Ultimo aggiornamento:{" "}
            {new Date().toLocaleDateString("it-IT", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              Cookie tecnici (sempre attivi)
            </h2>
            <p>
              Utilizziamo cookie tecnici necessari al funzionamento del sito
              (preferenze cookie). Non richiedono consenso.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              Cookie di marketing (consenso richiesto)
            </h2>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>
                <strong>Google Analytics 4</strong> — analisi statistica delle
                visite. Dati anonimizzati. Fornitore: Google Ireland Ltd.
              </li>
              <li>
                <strong>Meta Pixel</strong> — misurazione delle conversioni per
                campagne pubblicitarie su Facebook/Instagram. Fornitore: Meta
                Platforms Ireland Ltd.
              </li>
            </ul>
            <p className="mt-3">
              Nessun cookie di marketing viene attivato prima del tuo consenso
              esplicito tramite il banner.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              Come revocare il consenso
            </h2>
            <p>
              Puoi revocare il consenso in qualsiasi momento svuotando i cookie
              del browser o scrivendoci a{" "}
              <span className="text-yellow-500/70">[EMAIL — da completare]</span>
              .
            </p>
          </section>

          <p className="text-xs text-testo/30 mt-8 border-t border-bordo pt-4">
            Questa informativa è un template — da revisionare da un
            professionista prima della pubblicazione.
          </p>
        </div>
      </div>
    </main>
  );
}
