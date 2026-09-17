# Resellife Academy — README

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Vercel deploy

---

## Setup locale

```bash
# 1. Clona / scarica il progetto
cd reselllife.it

# 2. Copia le variabili d'ambiente
cp .env.local.example .env.local
# Poi apri .env.local e compila i campi obbligatori

# 3. Installa le dipendenze
npm install

# 4. Avvia il dev server
npm run dev
# → http://localhost:3000
```

---

## Variabili d'ambiente

| Variabile | Obbligatoria | Descrizione |
|---|---|---|
| `NEXT_PUBLIC_ACADEMY_URL` | ✅ **SÌ — build esplode** | URL checkout/iscrizione Academy |
| `NEXT_PUBLIC_FORM_ENDPOINT` | ✅ **SÌ** | Webhook/API che riceve i lead dal form |
| `NEXT_PUBLIC_CALENDLY_URL` | No | Link Calendly per la chiamata gratuita |
| `NEXT_PUBLIC_GA4_ID` | No | ID Google Analytics 4 (es. `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | ID Meta Pixel |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | No | ID TikTok Pixel |
| `NEXT_PUBLIC_SHOW_BOT_SECTION` | No | `true`/`false` — mostra/nasconde sezione Bot |
| `NEXT_PUBLIC_SITE_URL` | No | URL pubblico del sito (default: `https://www.resellife.it`) |

---

## Deploy su Vercel

```bash
# Installa Vercel CLI (se non ce l'hai)
npm i -g vercel

# Deploy
vercel

# Poi nel dashboard Vercel → Settings → Environment Variables
# Aggiungi tutte le variabili da .env.local.example
```

> ⚠️ **Non committare `.env.local`** — è in `.gitignore`.
> Usa il dashboard Vercel per le variabili di produzione.

---

## Struttura file

```
app/
  layout.tsx                     ← Fonts, metadata globali, CookieBanner, MobileStickyCTA
  page.tsx                       ← Home: tutte le 11 sezioni
  fornitori/page.tsx             ← Scaffold pagina fornitori (completare)
  informativa-sulla-privacy/     ← Privacy policy (completare con dati legali)
  informativa-sui-cookie/        ← Cookie policy
  sitemap.ts                     ← /sitemap.xml auto-generato
  robots.ts                      ← /robots.txt

components/
  Hero.tsx                       ← Sezione 1: H1 in testo, no iframe
  LeadForm.tsx                   ← Formulario riutilizzato (hero + CTA finale)
  Metodo.tsx                     ← Sezione 2: TROVA / VENDI / RIPETI
  Ecosistema.tsx                 ← Sezione 3: 6 feature dell'Academy
  BotSection.tsx                 ← Sezione 4: Bot (dietro SHOW_BOT_SECTION flag)
  ProvaSociale.tsx               ← Sezione 5: Carosello risultati
  Scelta.tsx                     ← Sezione 6: Academy vs Fornitore
  Bonus.tsx                      ← Sezione 7: Bonus bancari + nota legale
  Community.tsx                  ← Sezione 8: WhatsApp community
  FAQ.tsx                        ← Sezione 9: 8 domande con <details>
  Navbar.tsx                     ← Barra fissa superiore
  Footer.tsx                     ← Dati fiscali + link legali
  CookieBanner.tsx               ← Banner consenso (nessun pixel prima del consenso)
  MobileStickyCTA.tsx            ← Barra fissa inferiore mobile

lib/
  config.ts                      ← Tutte le costanti URL/env
  analytics.ts                   ← Wrapper eventi GA4/Meta/TikTok
```

---

## Placeholder da completare prima del lancio

I campi in giallo nell'UI e qui sotto sono **bloccanti per il lancio**:

- [ ] `NEXT_PUBLIC_ACADEMY_URL` — URL reale del checkout Academy
- [ ] `NEXT_PUBLIC_FORM_ENDPOINT` — Webhook/API per i lead
- [ ] Ragione sociale, P. IVA, sede, email nel footer
- [ ] Dati fiscali nelle pagine `/informativa-sulla-privacy` e `/informativa-sui-cookie`
- [ ] Revisione legale dell'informativa privacy e cookie
- [ ] Screenshot reali del Bot Resellife (3) in `BotSection.tsx`
- [ ] Screenshot reali dei risultati studenti in `ProvaSociale.tsx` (con consenso firmato)
- [ ] OG image `public/og-image.jpg` (1200×630, brand leggibile come miniatura)
- [ ] Video hero mp4 (se disponibile): `public/hero.mp4` + `public/hero-poster.jpg`
- [ ] URL reali dei prodotti in `/fornitori`
- [ ] Decisione Calendly: `/resellifeacademy` o `/resellifeacademy/30min`
- [ ] Verifica ToS piattaforma monitorata dal Bot (poi SHOW_BOT_SECTION=true/false)
- [ ] Revisione legale della FAQ sulla minore età

---

## Checklist di accettazione (brief §12)

```
[✅]  1. CTA Academy punta a NEXT_PUBLIC_ACADEMY_URL, non alla home
[✅]  2. Form in home, no reload di pagina
[✅]  3. Telefono marcato come (facoltativo)
[✅]  4. Checkbox privacy senza pre-spunta, obbligatorio
[✅]  5. H1 in testo reale, uno solo, non troncato
[✅]  6. Zero occorrenze di "Accademia"
[✅]  7. Zero errori ortografici nel copy
[✅]  8. Anno footer generato dinamicamente
[ ]   9. Dati fiscali nel footer — COMPLETARE
[✅] 10. Tutte le pagine con meta description e og:description
[ ]  11. og:image 1200×630 — CREARE e mettere in public/
[✅] 12. FAQ presente e funzionale da tastiera
[✅] 13. Unico link Calendly (costante in lib/config.ts)
[✅] 14. Zero iframe di terzi above the fold
[✅] 15. Video hero: mp4 con poster, o assente (no iframe YouTube)
[ ]  16. Test su mobile reale dentro WebView Instagram — DA FARE
[ ]  17. Zero scroll orizzontale a 320px — DA VERIFICARE
[ ]  18. LCP < 2,5s su mobile 4G simulata — DA MISURARE
[✅] 19. Banner consenso prima di qualsiasi pixel
[✅] 20. Nessuna parola vietata (garantito/automatico/domina/ecc.) nel copy
```
