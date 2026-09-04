import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { useShouldAnimate } from "@/hooks/use-should-animate";
import { cn } from "@/lib/utils";
import { SiteMockup } from "@/components/site/SiteMockup";
import { SocialPhone } from "@/components/site/SocialPhone";

/** `visual` del blocco creazione siti: al suo posto va il mockup del browser. */
const WEB_VISUAL = 0;

/** `visual` del blocco social: al suo posto va il mockup del telefono. */
const SOCIAL_VISUAL = 4;

/** Una feature scansionabile: sostituisce il paragrafo dove l'elenco rende di più. */
export type ServiceFeature = {
  icon: LucideIcon;
  title: string;
  text: string;
};

/** Abstract, illustrative-only interface fragments — consistent with the Metodo section. */
function ServiceVisual({
  kind,
  active,
  spinning,
}: {
  kind: number;
  /** Entrata in scena: una volta sola, poi resta. */
  active: boolean;
  /** Rotazione continua: si ferma quando la card esce dallo schermo. */
  spinning: boolean;
}) {
  const stroke = "var(--color-primary)";
  const faint = "var(--color-border-strong)";

  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" fill="none" className="h-full w-full">
      <rect x="4" y="8" width="192" height="104" rx="10" stroke={faint} strokeWidth="1" />
      <path d="M4 28 H196" stroke={faint} strokeWidth="1" />
      <circle cx="16" cy="18" r="2" fill={faint} />
      <circle cx="24" cy="18" r="2" fill={faint} />
      <circle cx="32" cy="18" r="2" fill={faint} />

      {/* 02 — restyling: cluttered layout resolving into a clean one */}
      {kind === 1 && (
        <g className={cn("method-draw", active && "is-active")}>
          <path
            d="M20 44 H84 M20 56 H74 M20 68 H88 M20 80 H66 M20 92 H80"
            stroke={faint}
            strokeWidth="1.5"
            strokeDasharray="4 5"
            pathLength={1}
          />
          <path d="M100 36 V100" stroke={faint} strokeWidth="1" />
          <rect
            x="118"
            y="42"
            width="62"
            height="26"
            rx="4"
            stroke={stroke}
            strokeWidth="1.5"
            pathLength={1}
          />
          <path
            d="M118 80 H180 M118 92 H150"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
          />
          <circle
            cx="100"
            cy="68"
            r="3"
            fill={stroke}
            className="method-dot"
            style={{ animationDelay: "360ms" }}
          />
        </g>
      )}

      {/* 03 — manutenzione: continuous maintenance spinner */}
      {kind === 2 && (
        <g className={cn("method-draw", active && "is-active")}>
          <path
            d="M28 44 H72 M28 58 H60 M28 72 H72 M28 86 H52"
            stroke={faint}
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
          />
          <g className={cn("service-spinner", !spinning && "is-paused")}>
            <circle
              cx="100"
              cy="68"
              r="26"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="120 43.4"
            />
          </g>
          <circle
            cx="100"
            cy="68"
            r="2.5"
            fill={stroke}
            className="method-dot"
            style={{ animationDelay: "520ms" }}
          />
        </g>
      )}

      {/* 04 — rebranding: marks recomposing into a new identity */}
      {kind === 3 && (
        <g className={cn("method-draw", active && "is-active")}>
          <circle cx="72" cy="68" r="24" stroke={faint} strokeWidth="1.5" />
          <circle cx="104" cy="68" r="24" stroke={stroke} strokeWidth="1.5" />
          <path
            d="M150 46 H180 M150 60 H172 M150 74 H180 M150 88 H164"
            stroke={faint}
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
          />
          <circle
            cx="88"
            cy="68"
            r="3"
            fill={stroke}
            className="method-dot"
            style={{ animationDelay: "560ms" }}
          />
        </g>
      )}
    </svg>
  );
}

export function ServiceShowcase({
  eyebrow,
  title,
  description,
  features,
  closing,
  extra,
  cta,
  visual,
  flip = false,
  lead = false,
}: {
  /** Sopra il titolo: lo usa il blocco che apre la pagina. */
  eyebrow?: string;
  title: string;
  description: string;
  /** Al posto di un secondo paragrafo: quello che il servizio comprende, a colpo d'occhio. */
  features?: ServiceFeature[];
  closing?: ReactNode;
  extra?: ReactNode;
  /** Azione in fondo al blocco: la usa solo il rimando al servizio social. */
  cta?: ReactNode;
  visual: number;
  flip?: boolean;
  /**
   * Il blocco apre la pagina: prende il posto della hero, quindi porta l'`h1`,
   * lascia spazio all'header fisso e non ha la riga che separa i blocchi
   * successivi — sopra non c'è nulla da separare.
   */
  lead?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);
  // Separato dall'entrata in scena: quello scatta una volta, questo continua
  // a osservare per fermare la rotazione infinita quando esce dallo schermo.
  const { ref: motionRef, shouldAnimate } = useShouldAnimate<HTMLDivElement>();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        }
      },
      // Stesso tempismo dei blocchi in dissolvenza: si parte all'affaccio.
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Il blocco d'apertura porta l'`h1` della pagina; gli altri restano `h2`.
  // Le feature scendono di un livello rispetto al titolo del proprio blocco,
  // così l'indice del documento non salta mai un grado.
  const Title = lead ? "h1" : "h2";
  const FeatureTitle = lead ? "h2" : "h3";

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={cn(
        "grid items-center gap-10 transition-all duration-[var(--transition-slow)] ease-[var(--ease-brand)] lg:grid-cols-12 lg:gap-16",
        // Sopra il blocco d'apertura c'è solo l'header fisso: niente riga
        // divisoria, e il padding che lascia respirare senza sprecare la
        // prima schermata.
        lead ? "pt-28 pb-14 sm:pt-32 sm:pb-16" : "border-t border-border py-16 sm:py-20",
        active ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
      )}
    >
      <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
        {eyebrow ? <p className="label-eyebrow">{eyebrow}</p> : null}
        <Title
          className={cn(
            "font-display font-semibold",
            eyebrow && "mt-5",
            lead
              ? "text-balance text-3xl leading-[1.08] sm:text-4xl lg:text-[3rem]"
              : "text-2xl leading-tight tracking-[0.04em] sm:text-3xl lg:text-[2.35rem]",
          )}
        >
          {title}
        </Title>
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground",
            lead ? "mt-5" : "mt-6",
          )}
        >
          {description}
        </p>
        {features ? (
          <ul
            className={cn(
              "grid max-w-2xl list-none gap-x-8 gap-y-6 sm:grid-cols-2",
              lead ? "mt-8" : "mt-9",
            )}
          >
            {features.map((feature, i) => (
              <li
                key={feature.title}
                className={cn("smm-fade-item flex items-start gap-3.5", active && "is-in")}
                style={{ animationDelay: `${120 + i * 90}ms` }}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-brand">
                  <feature.icon aria-hidden="true" size={17} strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <FeatureTitle className="font-display text-[0.95rem] font-semibold tracking-[0.02em]">
                    {feature.title}
                  </FeatureTitle>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {feature.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
        {extra ? <div className="mt-6 max-w-2xl">{extra}</div> : null}
        {closing ? (
          <p className="mt-7 max-w-xl border-l border-primary/50 pl-5 text-sm leading-relaxed text-foreground/90 sm:text-base">
            {closing}
          </p>
        ) : null}
        {cta ? <div className="mt-8">{cta}</div> : null}
      </div>

      <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
        {/* Due blocchi hanno un mockup vero al posto del pittogramma: la
            creazione siti mostra un sito nel browser, il servizio social un
            telefono — verticale, quindi senza cornice attorno. */}
        {visual === WEB_VISUAL ? (
          <SiteMockup />
        ) : visual === SOCIAL_VISUAL ? (
          <SocialPhone />
        ) : (
          <div className="surface-card w-full p-3 sm:p-4">
            <div ref={motionRef} className="aspect-[5/3] w-full">
              <ServiceVisual kind={visual} active={active} spinning={shouldAnimate} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
