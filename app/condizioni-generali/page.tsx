import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Condizioni generali di vendita | Resellife Academy",
  description:
    "Condizioni generali di vendita per i prodotti digitali di Resellife Academy.",
};

export default function CondizioniGeneraliPage() {
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
          Condizioni generali di vendita
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
              1. Venditore
            </h2>
            <p>
              Ragione sociale:{" "}
              <span className="text-yellow-500/70">
                [RAGIONE SOCIALE — DA COMPLETARE]
              </span>
              <br />
              P. IVA:{" "}
              <span className="text-yellow-500/70">
                [NUMERO P. IVA — DA COMPLETARE]
              </span>
              <br />
              Sede legale:{" "}
              <span className="text-yellow-500/70">
                [INDIRIZZO COMPLETO — DA COMPLETARE]
              </span>
              <br />
              Email:{" "}
              <span className="text-yellow-500/70">
                [EMAIL DI CONTATTO — DA COMPLETARE]
              </span>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              2. Prodotti digitali
            </h2>
            <p>
              <span className="text-yellow-500/70">
                [DA COMPLETARE — descrivere la natura dei prodotti digitali:
                guide, elenchi fornitori, manuali PDF, accesso alla community,
                ecc.]
              </span>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              3. Prezzi e pagamento
            </h2>
            <p>
              <span className="text-yellow-500/70">
                [DA COMPLETARE — indicare valuta (EUR), IVA inclusa o esclusa,
                metodi di pagamento accettati tramite Payhip.]
              </span>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              4. Consegna
            </h2>
            <p>
              <span className="text-yellow-500/70">
                [DA COMPLETARE — descrivere le modalità di consegna digitale:
                link di download, accesso immediato dopo il pagamento, durata
                dell&apos;accesso, ecc.]
              </span>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              5. Diritto di recesso per contenuti digitali
            </h2>
            <p>
              <span className="text-yellow-500/70">
                [DA COMPLETARE — ai sensi dell&apos;art. 59, lett. o) del Codice del
                Consumo, specificare le condizioni di esclusione del diritto di
                recesso per contenuti digitali forniti su supporto non materiale,
                previa accettazione esplicita del consumatore.]
              </span>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-testo text-lg mt-6 mb-2">
              6. Contatti
            </h2>
            <p>
              Per qualsiasi richiesta relativa agli acquisti, scrivi a:{" "}
              <span className="text-yellow-500/70">
                [EMAIL DI CONTATTO — DA COMPLETARE]
              </span>
            </p>
          </section>

          <p className="text-xs text-testo/30 mt-8 border-t border-bordo pt-4">
            Questo documento è un template di partenza — deve essere completato
            e revisionato da un professionista legale prima della pubblicazione.
          </p>
        </div>
      </div>
    </main>
  );
}
