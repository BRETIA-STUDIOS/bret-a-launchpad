import { useEffect, useRef, useState, type ReactNode } from "react";
import { useShouldAnimate } from "@/hooks/use-should-animate";
import { cn } from "@/lib/utils";

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

      {/* 01 — creazione: an interface assembling itself */}
      {kind === 0 && (
        <g className={cn("method-draw", active && "is-active")}>
          <rect
            x="20"
            y="40"
            width="76"
            height="56"
            rx="5"
            stroke={stroke}
            strokeWidth="1.5"
            pathLength={1}
          />
          <rect
            x="108"
            y="40"
            width="72"
            height="14"
            rx="3"
            stroke={faint}
            strokeWidth="1.5"
            pathLength={1}
          />
          <rect
            x="108"
            y="62"
            width="72"
            height="9"
            rx="3"
            stroke={faint}
            strokeWidth="1.5"
            pathLength={1}
          />
          <rect
            x="108"
            y="79"
            width="44"
            height="9"
            rx="3"
            stroke={stroke}
            strokeWidth="1.5"
            pathLength={1}
          />
          <circle
            cx="58"
            cy="68"
            r="3"
            fill={stroke}
            className="method-dot"
            style={{ animationDelay: "480ms" }}
          />
        </g>
      )}

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
  index,
  title,
  description,
  closing,
  extra,
  visual,
  flip = false,
}: {
  index: string;
  title: string;
  description: string;
  closing?: ReactNode;
  extra?: ReactNode;
  visual: number;
  flip?: boolean;
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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={cn(
        "grid items-center gap-10 border-t border-border py-16 transition-all duration-[var(--transition-slow)] ease-[var(--ease-brand)] sm:py-20 lg:grid-cols-12 lg:gap-16",
        active ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
      )}
    >
      <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
        <span className="font-display text-xs tracking-[0.3em] text-brand">{index}</span>
        <h2 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-[0.04em] sm:text-3xl lg:text-[2.35rem]">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        {extra ? <div className="mt-6 max-w-2xl">{extra}</div> : null}
        {closing ? (
          <p className="mt-7 max-w-xl border-l border-primary/50 pl-5 text-sm leading-relaxed text-foreground/90 sm:text-base">
            {closing}
          </p>
        ) : null}
      </div>

      <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <div className="surface-card w-full p-3 sm:p-4">
          <div ref={motionRef} className="aspect-[5/3] w-full">
            <ServiceVisual kind={visual} active={active} spinning={shouldAnimate} />
          </div>
        </div>
      </div>
    </article>
  );
}
