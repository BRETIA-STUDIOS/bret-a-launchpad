import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui-brand/Reveal";

type Stage = {
  key: string;
  title: string;
  text: string;
  subtext: string;
};

const STAGES: Stage[] = [
  {
    key: "analyze",
    title: "ANALIZZIAMO",
    text: "Capiamo l'attività, gli obiettivi e le persone da raggiungere.",
    subtext:
      "Studiamo l'attività, il pubblico e gli obiettivi prima di prendere qualsiasi decisione.",
  },
  {
    key: "design",
    title: "PROGETTIAMO",
    text: "Definiamo struttura, contenuti e direzione visiva.",
    subtext:
      "Trasformiamo le idee in una struttura chiara, funzionale e coerente con l'identità dell'attività.",
  },
  {
    key: "develop",
    title: "SVILUPPIAMO",
    text: "Costruiamo un sito veloce, responsive e curato nel dettaglio.",
    subtext:
      "Diamo forma al progetto curando esperienza, responsive design, performance e dettagli.",
  },
  {
    key: "launch",
    title: "LANCIAMO",
    text: "Pubblichiamo, verifichiamo e accompagniamo l'attività online.",
    subtext:
      "Mettiamo il progetto online, verifichiamo che tutto funzioni e lasciamo una base pronta per evolvere.",
  },
];

/** Abstract, illustrative-only interface fragments — no data, no metrics. */
function StageVisual({ step, active }: { step: number; active: boolean }) {
  const common = "h-full w-full";
  const stroke = "var(--color-primary)";
  const faint = "var(--color-border-strong)";

  return (
    <svg
      viewBox="0 0 160 90"
      aria-hidden="true"
      className={cn(common, "overflow-visible")}
      fill="none"
    >
      {/* shared frame — a subtle interface fragment */}
      <rect x="4" y="6" width="152" height="78" rx="8" stroke={faint} strokeWidth="1" />
      <path d="M4 20 H156" stroke={faint} strokeWidth="1" />
      <circle cx="14" cy="13" r="2" fill={faint} />
      <circle cx="22" cy="13" r="2" fill={faint} />
      <circle cx="30" cy="13" r="2" fill={faint} />

      {step === 0 && (
        <g className={cn("method-draw", active && "is-active")}>
          <path
            d="M18 68 L48 52 L78 60 L108 36 L142 44"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
          />
          <circle
            cx="48"
            cy="52"
            r="2.5"
            fill={stroke}
            className="method-dot"
            style={{ animationDelay: "220ms" }}
          />
          <circle
            cx="108"
            cy="36"
            r="2.5"
            fill={stroke}
            className="method-dot"
            style={{ animationDelay: "420ms" }}
          />
          <path d="M18 78 H142" stroke={faint} strokeWidth="1" strokeDasharray="3 4" />
        </g>
      )}

      {step === 1 && (
        <g className={cn("method-draw", active && "is-active")}>
          <rect
            x="18"
            y="30"
            width="44"
            height="42"
            rx="4"
            stroke={stroke}
            strokeWidth="1.5"
            pathLength={1}
          />
          <rect
            x="70"
            y="30"
            width="72"
            height="12"
            rx="3"
            stroke={faint}
            strokeWidth="1.5"
            pathLength={1}
          />
          <rect
            x="70"
            y="48"
            width="72"
            height="8"
            rx="3"
            stroke={faint}
            strokeWidth="1.5"
            pathLength={1}
          />
          <rect
            x="70"
            y="62"
            width="44"
            height="8"
            rx="3"
            stroke={faint}
            strokeWidth="1.5"
            pathLength={1}
          />
        </g>
      )}

      {step === 2 && (
        <g className={cn("method-draw", active && "is-active")}>
          <path
            d="M30 40 L20 51 L30 62"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
          />
          <path
            d="M118 40 L128 51 L118 62"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
          />
          <path
            d="M44 68 H104"
            stroke={faint}
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
          />
          <path
            d="M44 34 H104"
            stroke={faint}
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
          />
          <path
            d="M62 30 L86 72"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
          />
        </g>
      )}

      {step === 3 && (
        <g className={cn("method-draw", active && "is-active")}>
          <path
            d="M20 72 C 60 72, 84 46, 96 30"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
          />
          <path
            d="M96 30 L86 32 M96 30 L94 40"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
          />
          <circle
            cx="96"
            cy="30"
            r="3"
            fill={stroke}
            className="method-dot"
            style={{ animationDelay: "520ms" }}
          />
          <path d="M112 68 H142" stroke={faint} strokeWidth="1" strokeDasharray="3 4" />
        </g>
      )}
    </svg>
  );
}

export function MethodFlow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

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
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* progressive rail */}
      <div
        aria-hidden="true"
        className="absolute left-[0.4375rem] top-2 bottom-2 w-px bg-border lg:left-0 lg:right-0 lg:top-[0.4375rem] lg:bottom-auto lg:h-px lg:w-auto"
      >
        <span
          className={cn(
            "block h-full w-full origin-top bg-primary/70 transition-transform duration-[1600ms] ease-[var(--ease-brand)] lg:origin-left",
            active ? "scale-y-100 lg:scale-x-100" : "scale-y-0 lg:scale-y-100 lg:scale-x-0",
          )}
        />
      </div>

      <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
        {STAGES.map((stage, i) => (
          <li
            key={stage.key}
            style={{ transitionDelay: `${i * 140}ms` }}
            className={cn(
              "relative pl-8 transition-all duration-[var(--transition-slow)] ease-[var(--ease-brand)] lg:pl-0 lg:pt-8",
              active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border border-primary/60 bg-background transition-colors duration-500 lg:left-0 lg:top-0",
                active && "bg-primary/15",
              )}
            >
              <span className="h-1 w-1 rounded-full bg-primary" />
            </span>

            <h3 className="font-display text-lg font-semibold tracking-[0.1em]">{stage.title}</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {stage.text}
            </p>

            {/* additional description — appears subtly as the user scrolls through */}
            <Reveal delay={120}>
              <p className="mt-5 border-t border-border/60 pt-4 text-xs leading-relaxed text-muted-foreground/70">
                {stage.subtext}
              </p>
            </Reveal>

            <div className="mt-7 h-[5.5rem] w-full max-w-[16rem] rounded-[var(--radius-lg)] border border-border bg-surface/40 p-2">
              <StageVisual step={i} active={active} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
