import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { OG_IMAGE_ALT, OG_IMAGE_PATH, SITE_NAME, absoluteUrl } from "../lib/seo";
import { BRAND_FONTS_HREF } from "../lib/fonts";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Pagina non trovata</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La pagina che cerchi non esiste o è stata spostata.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Questa pagina non si è caricata
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Qualcosa è andato storto. Puoi riprovare o tornare alla home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
          >
            Riprova
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border-strong bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Torna alla home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BRETÌA Web Studio — Professionalità digitale, per tutti" },
      {
        name: "description",
        content:
          "BRETÌA è un web studio italiano che progetta siti web moderni, professionali e accessibili per piccole e medie attività.",
      },
      { name: "author", content: SITE_NAME },

      // Metadati social validi per tutto il sito. Le singole pagine
      // sovrascrivono titolo, descrizione, og:url e canonical via pageHead().
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "it_IT" },
      { property: "og:image", content: absoluteUrl(OG_IMAGE_PATH) },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absoluteUrl(OG_IMAGE_PATH) },

      { name: "theme-color", content: "#0b1020" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      /*
       * Solo i due caratteri del marchio: Space Grotesk (titoli) e DM Sans
       * (testo). Cormorant Garamond e Jost servono unicamente alla pagina
       * Osteria Nòva e ora vengono richiesti soltanto lì: prima ogni pagina
       * del sito ne scaricava quattro, due dei quali non usava mai.
       * `display=swap` fa comparire subito il testo con il carattere di
       * sistema, che viene sostituito appena il font è pronto.
       */
      { rel: "preload", as: "style", href: BRAND_FONTS_HREF },
      { rel: "stylesheet", href: BRAND_FONTS_HREF },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isImmersive = pathname.startsWith("/portfolio/osteria-nova");

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Vai al contenuto
      </a>
      {isImmersive ? null : <Header />}
      {/* tabIndex={-1} rende `main` bersaglio valido per lo skip link: senza,
          il link scorre la pagina ma il focus resta sul body e la tabulazione
          riparte dall'header, vanificando il salto. */}
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Outlet />
      </main>
      {isImmersive ? null : <Footer />}
    </QueryClientProvider>
  );
}
