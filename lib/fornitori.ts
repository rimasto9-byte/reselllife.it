/**
 * lib/fornitori.ts — Dati dei pack di fornitori venduti su Payhip.
 * Ordinati per prezzo ascendente.
 *
 * DA COMPLETARE:
 *   - description: sostituire "DA COMPLETARE" con la descrizione reale
 *   - includes: aggiungere la lista dei contenuti
 *   - compareAtPrice: aggiungere solo quando l'equivalenza tra pack è confermata
 */

export interface FornitoreProduct {
  id: string;
  title: string;
  price: number;
  url: string;
  image: string;
  description: string;
  includes: string[];
  compareAtPrice?: number;
  featured?: boolean;
}

export const products: FornitoreProduct[] = [
  {
    id: "manuale-vinted",
    title: "Manuale Vinted",
    price: 14.99,
    url: "https://payhip.com/b/TIwXx",
    image: "/fornitori/manuale-vinted.png",
    description: "DA COMPLETARE",
    includes: [],
  },
  {
    id: "starter-pack",
    title: "Starter Pack",
    price: 19.99,
    url: "https://payhip.com/b/4otCi",
    image: "/fornitori/starter-pack.png",
    description: "DA COMPLETARE",
    includes: [],
  },
  {
    id: "bundle-italiani",
    title: "Bundle Fornitori Italiani",
    price: 27.99,
    url: "https://payhip.com/b/bekUq",
    image: "/fornitori/bundle-italiani.png",
    description: "DA COMPLETARE",
    includes: [],
  },
  {
    id: "bundle-internazionali",
    title: "Bundle Fornitori Internazionali",
    price: 34.99,
    url: "https://payhip.com/b/OIhY5",
    image: "/fornitori/bundle-internazionali.png",
    description: "DA COMPLETARE",
    includes: [],
  },
  {
    id: "pack-completo",
    title: "Pack Completo Fornitori",
    price: 39.99,
    url: "https://payhip.com/b/ZXh9w",
    image: "/fornitori/pack-completo.png",
    description: "DA COMPLETARE",
    includes: [],
    featured: true,
  },
  {
    id: "pack-completo-guida-vinted",
    title: "Pack Completo + Guida Vinted",
    price: 44.99,
    url: "https://payhip.com/b/4tc3z",
    image: "/fornitori/pack-completo-guida-vinted.png",
    description: "DA COMPLETARE",
    includes: [],
  },
];
