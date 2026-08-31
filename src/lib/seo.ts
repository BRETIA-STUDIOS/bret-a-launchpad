/**
 * Sorgente unica dei metadati di pagina (SEO + condivisione social).
 *
 * Ogni route costruisce il proprio `head()` con `pageHead()`: da un solo
 * oggetto nascono title, description, Open Graph, Twitter Card e il
 * `<link rel="canonical">`, tutti con URL assoluti come richiedono i crawler.
 */

/*
 * ⚠️ DOMINIO PROVVISORIO — DA CONFERMARE PRIMA DEL DEPLOY.
 * È l'unico punto del progetto in cui vive il dominio: canonical e og:url di
 * tutte le pagine derivano da qui. Cambiando questa riga si aggiorna l'intero
 * sito. Se il dominio definitivo userà il www, va indicato qui per intero
 * (es. "https://www.bretia.studio") e l'altra variante va rediretta con un 301.
 */
export const SITE_URL = "https://bretia.studio";

export const SITE_NAME = "BRETÌA Web Studio";

/** Immagine di condivisione predefinita: public/og-image.png, 1200×630. */
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_ALT = "BRETÌA Web Studio — la professionalità digitale, per tutti";

/** Trasforma un percorso interno nell'URL assoluto usato da canonical e og:url. */
export function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageHeadInput = {
  /** Percorso della pagina, con lo slash iniziale. La home è "/". */
  path: string;
  title: string;
  description: string;
  /** Titolo social, se deve differire da quello del browser. */
  ogTitle?: string;
  /** Descrizione social, di norma più breve e discorsiva. */
  ogDescription?: string;
  /** Immagine social specifica della pagina (percorso interno). */
  image?: string;
  imageAlt?: string;
  /** Esclude la pagina dagli indici dei motori di ricerca. */
  noindex?: boolean;
};

export function pageHead({
  path,
  title,
  description,
  ogTitle,
  ogDescription,
  image = OG_IMAGE_PATH,
  imageAlt = OG_IMAGE_ALT,
  noindex = false,
}: PageHeadInput) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    meta: [
      { title },
      { name: "description", content: description },

      { property: "og:title", content: ogTitle ?? title },
      { property: "og:description", content: ogDescription ?? description },
      { property: "og:url", content: url },
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt },

      { name: "twitter:title", content: ogTitle ?? title },
      { name: "twitter:description", content: ogDescription ?? description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: imageAlt },

      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
