import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { pageHead } from "@/lib/seo";

/** Only same-origin relative paths may be used as a post-login destination. */
function safeNext(value: unknown): string {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    next: safeNext(search["next"]),
  }),
  head: () =>
    pageHead({
      path: "/auth",
      title: "Accedi — BRETÌA Web Studio",
      description:
        "Accedi al tuo account BRETÌA per autorizzare le applicazioni collegate e gestire il tuo accesso.",
      ogDescription: "Area riservata BRETÌA Web Studio: accedi o crea il tuo account.",
      noindex: true,
    }),
  component: AuthPage,
});

const inputClass =
  "w-full min-w-0 rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void supabase.auth.getSession().then(({ data }) => {
      if (!cancelled && data.session) window.location.replace(next);
    });
    return () => {
      cancelled = true;
    };
  }, [next]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}${next}` },
      });
      setBusy(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      if (!data.session) {
        setNotice("Ti abbiamo inviato una email di conferma. Aprila per attivare l'account.");
        return;
      }
      window.location.assign(next);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    window.location.assign(next);
  }

  async function onGoogle() {
    setBusy(true);
    setError(null);
    // The consent/return URL must survive the provider round-trip.
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}${next}`,
    });
    if (result.error) {
      setBusy(false);
      setError("Accesso con Google non riuscito. Riprova.");
      return;
    }
    if (result.redirected) return;
    void navigate({ href: next });
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-32">
      <BretiaSymbol className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.05]" />

      <div className="relative w-full max-w-md">
        <p className="label-eyebrow">AREA RISERVATA</p>
        <h1 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          {mode === "signin" ? "Accedi al tuo account." : "Crea il tuo account."}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          L'accesso serve ad autorizzare le applicazioni collegate al tuo account BRETÌA. Il sito
          resta pubblico e consultabile senza login.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <div>
            <label htmlFor="email" className="label-eyebrow">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-3 ${inputClass}`}
              placeholder="nome@esempio.it"
            />
          </div>
          <div>
            <label htmlFor="password" className="label-eyebrow">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-3 ${inputClass}`}
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm text-brand">
              {error}
            </p>
          ) : null}
          {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary px-6 py-3 font-display text-sm tracking-[0.08em] text-primary-foreground transition-all duration-200 hover:brightness-110 disabled:opacity-60"
          >
            {mode === "signin" ? "Accedi" : "Crea account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4 text-xs tracking-[0.28em] text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          OPPURE
          <span className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={onGoogle}
          disabled={busy}
          className="w-full rounded-full border border-border-strong px-6 py-3 font-display text-sm tracking-[0.08em] text-foreground transition-colors duration-200 hover:border-primary disabled:opacity-60"
        >
          Continua con Google
        </button>

        <p className="mt-8 text-sm text-muted-foreground">
          {mode === "signin" ? "Non hai ancora un account?" : "Hai già un account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setNotice(null);
            }}
            className="text-foreground underline underline-offset-4 transition-colors hover:text-brand"
          >
            {mode === "signin" ? "Registrati" : "Accedi"}
          </button>
        </p>
      </div>
    </section>
  );
}
