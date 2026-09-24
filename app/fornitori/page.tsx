import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BuyButton from "@/components/BuyButton";
import { ACADEMY_URL, CALENDLY_URL, COACHING_APPLY_URL } from "@/lib/config";
import { products } from "@/lib/fornitori";

const isDev = process.env.NODE_ENV !== "production";

const fmt = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

export const metadata: Metadata = {
  title: "Fornitori | Resellife Academy",
  description:
    "Pack di fornitori italiani e internazionali testati dal team Resellife, più il manuale Vinted. Scegli il pack adatto a te.",
  openGraph: {
    description:
      "Pack di fornitori italiani e internazionali testati dal team Resellife, più il manuale Vinted. Scegli il pack adatto a te.",
  },
};

export default function FornitoriPage() {
  return (
    <>
      <Navbar academyUrl={ACADEMY_URL} />
      <main id="main-content" className="min-h-screen bg-notte">
        {/* ── Hero ── */}
        <section className="py-16 lg:py-24 bg-superficie">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-anton text-[clamp(2.2rem,6vw,4.5rem)] uppercase text-testo leading-none mb-5">
              I FORNITORI RESELLIFE
            </h1>
            <p className="text-testo/65 text-lg leading-relaxed max-w-2xl mx-auto">
              I fornitori testati dal team Resellife, pronti da usare per il
              tuo reselling.
            </p>
          </div>
        </section>

        {/* ── Grid prodotti ── */}
        <section
          aria-labelledby="prodotti-heading"
          className="py-16 lg:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="prodotti-heading"
              className="font-anton text-[clamp(1.6rem,3vw,2.2rem)] uppercase text-testo mb-10 text-center"
            >
              Scegli il pack
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, idx) => {
                const isMissingContent =
                  product.description === "DA COMPLETARE" ||
                  product.includes.length === 0;
                const priceFormatted = fmt.format(product.price);
                const savings = product.compareAtPrice
                  ? fmt.format(product.compareAtPrice - product.price)
                  : null;

                return (
                  <article
                    key={product.id}
                    className={`bg-superficie rounded-card-lg overflow-hidden flex flex-col border ${
                      product.featured
                        ? "border-viola shadow-lg shadow-viola/10"
                        : "border-bordo"
                    }`}
                  >
                    {product.featured && (
                      <div className="bg-viola px-4 py-1.5 text-center">
                        <span className="text-white text-xs font-semibold uppercase tracking-wider">
                          Pack più completo
                        </span>
                      </div>
                    )}

                    {/* Immagine */}
                    <div className="relative aspect-square w-full bg-notte rounded-t-2xl overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={`Copertina ${product.title}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                          priority={idx < 2}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-testo/20 text-xs">
                            Immagine da aggiungere
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Contenuto */}
                    <div className="p-5 flex flex-col gap-4 flex-1">
                      {/* Avviso sviluppo */}
                      {isDev && isMissingContent && (
                        <p className="bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 text-xs px-3 py-2 rounded">
                          ⚠ DA COMPLETARE — description e/o includes mancanti
                        </p>
                      )}

                      <div>
                        <h3 className="font-semibold text-testo text-base mb-1">
                          {product.title}
                        </h3>

                        {/* Prezzo */}
                        <div className="flex items-baseline gap-2">
                          <span className="font-anton text-2xl text-testo">
                            {priceFormatted}
                          </span>
                          {product.compareAtPrice && (
                            <>
                              <span className="text-testo/40 line-through text-sm">
                                {fmt.format(product.compareAtPrice)}
                              </span>
                              <span className="text-accento text-xs font-medium">
                                Risparmi {savings}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      {product.description !== "DA COMPLETARE" && (
                        <p className="text-testo/60 text-sm leading-relaxed">
                          {product.description}
                        </p>
                      )}

                      {/* Includes */}
                      {product.includes.length > 0 && (
                        <ul className="space-y-1.5">
                          {product.includes.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-testo/70"
                            >
                              <Check
                                size={15}
                                className="text-viola mt-0.5 flex-shrink-0"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* CTA */}
                      <div className="mt-auto pt-2">
                        <BuyButton
                          url={product.url}
                          productId={product.id}
                          price={product.price}
                          label="Acquista ora"
                          ariaLabel={`Acquista ${product.title} a ${priceFormatted}`}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Nota legale */}
            <p className="text-testo/50 text-sm text-center mt-10 max-w-2xl mx-auto leading-relaxed">
              Prodotti digitali. Pagamento sicuro tramite Payhip. Il contenuto
              viene consegnato subito dopo l&apos;acquisto.{" "}
              <a
                href="/condizioni-generali"
                className="text-viola underline underline-offset-2 hover:text-viola-hover"
              >
                Condizioni generali
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── Coaching ── */}
        <section
          id="coaching"
          aria-labelledby="coaching-heading"
          className="py-16 lg:py-24 bg-superficie"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* Immagine */}
              <div className="relative w-full max-w-sm aspect-square rounded-card-lg overflow-hidden bg-notte flex-shrink-0">
                <Image
                  src="/fornitori/coaching.jpg"
                  alt="Percorso coaching con il team Resellife"
                  fill
                  sizes="(max-width: 1024px) 80vw, 384px"
                  className="object-cover"
                />
              </div>

              {/* Testo */}
              <div className="flex flex-col gap-5">
                <h2
                  id="coaching-heading"
                  className="font-anton text-[clamp(1.8rem,4vw,3rem)] uppercase text-testo leading-none"
                >
                  Lavora con il team Resellife
                </h2>
                <p className="text-testo/65 leading-relaxed">
                  Un percorso su misura di reselling, dropshipping o drop
                  branding, costruito sui nostri fornitori insieme al team.
                </p>
                <div>
                  <a
                    href={COACHING_APPLY_URL}
                    rel="noopener"
                    className="inline-block py-4 px-8 rounded-btn bg-accento text-white font-semibold text-base hover:bg-accento-hover transition-colors duration-200 min-h-[44px]"
                  >
                    Candidati ora
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Chiamata gratuita ── */}
        <section
          aria-labelledby="chiamata-heading"
          className="py-16 lg:py-24 bg-notte text-center"
        >
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="chiamata-heading"
              className="font-anton text-[clamp(1.8rem,4vw,2.8rem)] uppercase text-testo mb-4 leading-none"
            >
              Hai domande?
            </h2>
            <p className="text-testo/65 leading-relaxed mb-8">
              Prenota una chiamata gratuita e senza impegno con il team:
              capiamo insieme quale pack o percorso fa per te.
            </p>
            <a
              href={CALENDLY_URL}
              rel="noopener"
              className="inline-block py-4 px-8 rounded-btn border border-viola text-viola font-semibold text-base hover:bg-viola/10 transition-colors duration-200 min-h-[44px]"
            >
              Prenota la chiamata
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
