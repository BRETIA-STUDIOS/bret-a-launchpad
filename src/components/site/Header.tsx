import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { BrandButton } from "@/components/ui-brand/BrandButton";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

/** Session state for the sign-in affordance. `undefined` = not resolved yet. */
function useSessionEmail() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, session) =>
      setEmail(session?.user.email ?? null),
    );
    return () => data.subscription.unsubscribe();
  }, []);
  return email;
}

function AuthLink({ onNavigate }: { onNavigate?: () => void }) {
  const email = useSessionEmail();
  if (email === undefined) return null;
  const className =
    "font-display text-[0.8125rem] tracking-[0.1em] text-muted-foreground transition-colors duration-200 hover:text-foreground";
  if (!email) {
    return (
      <Link to="/auth" search={{ next: "/" }} onClick={onNavigate} className={className}>
        Accedi
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        onNavigate?.();
        await supabase.auth.signOut();
      }}
    >
      Esci
    </button>
  );
}

export const NAV_ITEMS = [
  { to: "/servizi", label: "Servizi" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/metodo", label: "Metodo" },
  { to: "/chi-siamo", label: "Chi siamo" },
  { to: "/contatti", label: "Contatti" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-[var(--transition-base)]",
        scrolled || open
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container-brand flex h-20 items-center justify-between">
        <Logo />

        <nav aria-label="Navigazione principale" className="hidden items-center gap-9 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative py-2 font-display text-[0.8125rem] tracking-[0.1em] text-muted-foreground transition-colors duration-200 hover:text-foreground [&.active]:text-foreground"
              activeProps={{ className: "active" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <BrandButton to="/contatti">Parliamone</BrandButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-primary lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <button
          type="button"
          aria-label="Chiudi il menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-20 z-40 cursor-default bg-background/70 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <div
        id="mobile-nav"
        hidden={!open}
        className="relative z-50 border-t border-border bg-background lg:hidden"
      >
        <nav aria-label="Navigazione mobile" className="container-brand flex flex-col py-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="border-b border-border py-4 font-display text-lg tracking-[0.04em] text-foreground/90 transition-colors duration-200 hover:text-primary active:text-primary [&.active]:text-primary"
              activeProps={{ className: "active" }}
            >
              {item.label}
            </Link>
          ))}
          <BrandButton to="/contatti" className="mt-8 w-full" onClick={() => setOpen(false)}>
            Parliamone
          </BrandButton>
        </nav>
      </div>
    </header>
  );
}
