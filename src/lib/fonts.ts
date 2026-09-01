/**
 * Caratteri tipografici del sito.
 *
 * Sono divisi in due gruppi perché hanno pubblici diversi:
 * - i caratteri del marchio servono ovunque e vengono caricati dalla radice;
 * - quelli dell'Osteria servono a una sola pagina e vengono caricati solo lì.
 *
 * Prima erano tutti e quattro in un'unica richiesta globale: ogni visitatore
 * scaricava anche i due caratteri di una pagina dimostrativa che magari non
 * avrebbe mai aperto.
 */

/** Space Grotesk (titoli) + DM Sans (testo corrente). Serve a tutto il sito. */
export const BRAND_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..700&family=Space+Grotesk:wght@400;500;600;700&display=swap";

/** Cormorant Garamond + Jost: identità dell'Osteria Nòva, solo su quella pagina. */
export const OSTERIA_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..600&family=Jost:wght@300;400;500;600&display=swap";

/*
 * ─────────────────────────────────────────────────────────────────────────
 * PASSAGGIO A CARATTERI OSPITATI IN PROPRIO (quando si vuole)
 *
 * Oggi i caratteri arrivano dai server di Google: due connessioni esterne
 * prima che il testo possa assumere il suo aspetto definitivo. Ospitarli
 * direttamente sul sito toglie quelle connessioni e permette di precaricare
 * i file veri (con Google non si può: gli indirizzi dei file sono generati
 * e cambiano nel tempo).
 *
 * Passaggi:
 *   1. Scaricare i file .woff2 di Space Grotesk e DM Sans e metterli in
 *      `public/fonts/`.
 *   2. Sostituire in questo file gli indirizzi con `null` e togliere da
 *      __root.tsx i due `preconnect` verso Google e il foglio di stile.
 *   3. Dichiarare i caratteri in `styles.css` con `font-display: swap`
 *      e l'intervallo `unicode-range` latino.
 *   4. Aggiungere in __root.tsx il precaricamento del solo carattere dei
 *      titoli, che è quello che si vede per primo:
 *        { rel: "preload", as: "font", type: "font/woff2",
 *          href: "/fonts/space-grotesk-latin.woff2", crossOrigin: "anonymous" }
 *
 * I nomi delle famiglie in `styles.css` (--font-display e --font-sans) non
 * vanno cambiati: restano "Space Grotesk" e "DM Sans".
 * ─────────────────────────────────────────────────────────────────────────
 */
