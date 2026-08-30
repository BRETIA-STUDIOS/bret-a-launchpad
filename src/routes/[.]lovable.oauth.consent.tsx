import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";

type OAuthClient = { name?: string; client_name?: string; redirect_uri?: string };
type AuthorizationDetails = {
  client?: OAuthClient;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};

// `supabase.auth.oauth` is a beta namespace not yet in the published types.
type OAuthApi = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

function oauthApi(): OAuthApi {
  return (supabase.auth as unknown as { oauth: OAuthApi }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  // Browser-only: the session lives in localStorage and is absent during SSR.
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    authorization_id: typeof search["authorization_id"] === "string" ? search["authorization_id"] : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search["authorization_id"]) throw new Error("Richiesta di autorizzazione non valida.");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({
        to: "/auth",
        search: { next: location.pathname + location.searchStr },
      });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center px-5 py-32">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold">Autorizzazione non disponibile</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {String((error as Error)?.message ?? error)}
        </p>
      </div>
    </main>
  ),
});

const SCOPE_LABELS: Record<string, string> = {
  openid: "Verificare la tua identità",
  email: "Vedere il tuo indirizzo email",
  profile: "Vedere i dati base del tuo profilo",
};

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "l'applicazione";
  const scopes = (details?.scope ?? "").split(/\s+/).filter(Boolean);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const api = oauthApi();
    const { data, error: decisionError } = approve
      ? await api.approveAuthorization(authorization_id)
      : await api.denyAuthorization(authorization_id);
    if (decisionError) {
      setBusy(false);
      setError(decisionError.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("Il server di autorizzazione non ha restituito un indirizzo di ritorno.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-32">
      <BretiaSymbol className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.05]" />

      <div className="relative w-full max-w-md">
        <p className="label-eyebrow">AUTORIZZAZIONE</p>
        <h1 className="mt-5 font-display text-3xl font-semibold leading-tight">
          Collega {clientName} a BRETÌA Web Studio.
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {clientName} potrà utilizzare gli strumenti abilitati di questa applicazione a tuo nome.
        </p>

        {details?.client?.redirect_uri ? (
          <p className="mt-4 break-all text-xs text-muted-foreground">
            Indirizzo di ritorno: {details.client.redirect_uri}
          </p>
        ) : null}

        {scopes.length > 0 ? (
          <ul className="mt-8 space-y-3 border-t border-border pt-6">
            {scopes.map((scope) => (
              <li key={scope} className="text-sm text-foreground/90">
                {SCOPE_LABELS[scope] ?? `Permesso aggiuntivo richiesto: ${scope}`}
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Questa autorizzazione non aggira i permessi né le policy di sicurezza dell'applicazione.
        </p>

        {error ? (
          <p role="alert" className="mt-6 text-sm text-primary">
            {error}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 rounded-full bg-primary px-6 py-3 font-display text-sm tracking-[0.08em] text-primary-foreground transition-all duration-200 hover:brightness-110 disabled:opacity-60"
          >
            Autorizza
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => decide(false)}
            className="flex-1 rounded-full border border-border-strong px-6 py-3 font-display text-sm tracking-[0.08em] text-foreground transition-colors duration-200 hover:border-primary disabled:opacity-60"
          >
            Annulla
          </button>
        </div>
      </div>
    </main>
  );
}
