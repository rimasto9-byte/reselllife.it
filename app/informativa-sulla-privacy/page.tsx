import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Informativa sulla Privacy | Resellife Academy",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del GDPR (Regolamento UE 2016/679) per Resellife Academy.",
};

export default function PrivacyPage() {
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
          Informativa sulla Privacy
        </h1>

        <div className="prose prose-sm max-w-none text-testo/70 space-y-6 leading-relaxed">
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
              1. Titolare del trattamento
            </h2>
            <p>
              Il titolare del trattamento è{" "}
              <span className="text-yellow-500/70">
                [RAGIONE SOCIALE — da completare]
              </span>
              , con sede in{" "}
              <span className="text-yellow-500/70">[INDIRIZZO — da completare]</span>
              , P. IVA{" "}
              <span className="text-yellow-500/70">[NUMERO — da completare]</span>
              , email:{" "}
              <span className="text-yellow-500/70">[EMAIL — da completare]</span>.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              2. Dati raccolti e finalità
            </h2>
            <p>
              Raccogliamo i seguenti dati personali tramite il modulo di
              contatto:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Nome</strong> — per personalizzare la comunicazione
              </li>
              <li>
                <strong>Indirizzo email</strong> — per inviare la guida
                richiesta e, previo consenso, comunicazioni commerciali
              </li>
              <li>
                <strong>Numero di telefono</strong> (facoltativo) — per
                contatti di follow-up se richiesti
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              3. Base giuridica
            </h2>
            <p>
              Il trattamento è basato sul consenso esplicito dell&apos;utente
              (art. 6, par. 1, lett. a, GDPR), espresso attraverso il checkbox
              nel modulo.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              4. Conservazione
            </h2>
            <p>
              I dati sono conservati per il tempo necessario alle finalità
              indicate, e comunque non oltre 24 mesi dall&apos;ultima
              interazione.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              5. Diritti dell&apos;interessato
            </h2>
            <p>
              Hai il diritto di accedere, rettificare, cancellare i tuoi dati,
              opporti al trattamento o richiederne la portabilità. Per
              esercitare questi diritti, scrivi a{" "}
              <span className="text-yellow-500/70">[EMAIL — da completare]</span>
              .
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              6. Cookie e strumenti di analisi
            </h2>
            <p>
              Vedi l&apos;
              <Link
                href="/informativa-sui-cookie"
                className="text-viola underline"
              >
                informativa sui cookie
              </Link>
              .
            </p>
          </section>

          <p className="text-xs text-testo/30 mt-8 border-t border-bordo pt-4">
            Questa informativa è un template di partenza — deve essere
            completata e revisionata da un professionista legale prima della
            pubblicazione.
          </p>
        </div>
      </div>
    </main>
  );
}
