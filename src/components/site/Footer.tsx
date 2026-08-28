import { Link } from "@tanstack/react-router";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { Signature } from "@/components/ui-brand/Signature";
import { NAV_ITEMS } from "./Header";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="container-brand py-16 lg:py-24">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <BretiaSymbol className="h-9 w-auto" />
              <div>
                <p className="font-display text-xl font-semibold tracking-[0.18em]">BRETÌA</p>
                <p className="mt-1 text-[0.5625rem] tracking-[0.34em] text-muted-foreground">
                  WEB STUDIO
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Professionalità digitale, alla portata di tutti. Progettiamo siti web moderni e
              accessibili per piccole e medie attività.
            </p>
          </div>

          <nav aria-label="Navigazione footer">
            <p className="label-eyebrow">Studio</p>
            <ul className="mt-6 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-eyebrow">Contatti</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:hello@bretia.studio"
                  className="transition-colors duration-200 hover:text-foreground"
                >
                  hello@bretia.studio
                </a>
              </li>
              <li>Italia — da remoto</li>
              <li className="flex gap-4 pt-2">
                <a href="#" className="transition-colors duration-200 hover:text-foreground">
                  Instagram
                </a>
                <a href="#" className="transition-colors duration-200 hover:text-foreground">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BRETÌA Web Studio. Tutti i diritti riservati.
          </p>
          <Signature />
        </div>
      </div>
    </footer>
  );
}
