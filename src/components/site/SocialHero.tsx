import { useEffect, useRef, useState } from "react";
import phoneAsset from "@/assets/social-phone.png.asset.json";
import { cn } from "@/lib/utils";

/** Posizioni finali dei pallini luminosi, in percentuale dello stage. */
const ORBS = [
  { ox: "128%", oy: "-108%", delay: 0 },
  { ox: "142%", oy: "-24%", delay: 120 },
  { ox: "138%", oy: "62%", delay: 240 },
  { ox: "126%", oy: "132%", delay: 360 },
  { ox: "-136%", oy: "-96%", delay: 180 },
  { ox: "-142%", oy: "70%", delay: 300 },
];

const LABELS = ["STRATEGIA", "CONTENUTI", "GESTIONE", "ANALISI"];

/**
 * Sequenza d'entrata del visual social: parte una volta sola quando la hero
 * entra nel viewport e poi resta ferma. Nessun loop, nessuna animazione
 * residua: tutto è CSS con `both`, così a fine sequenza il browser non ha
 * più nulla da comporre.
 */
export function SocialHero() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<"idle" | "playing" | "static">("idle");

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setState("static");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("playing");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stageRef}
      className={cn(
        "smm-stage relative mx-auto w-full max-w-[38rem]",
        state === "playing" && "is-playing",
        state === "static" && "is-static",
      )}
    >
      <div className="relative aspect-4/3 w-full">
        {/* Livello 1 — solo il telefono (stessa immagine, ritagliata) */}
        <img
          src={phoneAsset.url}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="smm-phone absolute inset-0 h-full w-full object-contain"
          style={{ clipPath: "inset(0 26% 0 28%)" }}
        />

        {/* Livello 2 — composizione completa, in dissolvenza dopo l'orbita */}
        <img
          src={phoneAsset.url}
          alt="Smartphone con profilo social gestito da BRETÌA e icone delle principali piattaforme"
          decoding="async"
          className="smm-full absolute inset-0 h-full w-full object-contain"
        />

        {/* Scie luminose: si disegnano dal telefono verso l'esterno e svaniscono */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 75"
          fill="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {[
            "M50 34 C 66 26, 74 20, 86 15",
            "M50 36 C 68 34, 78 32, 90 30",
            "M50 40 C 68 44, 78 48, 89 50",
            "M50 44 C 64 54, 74 60, 85 64",
            "M50 34 C 36 26, 26 22, 15 17",
            "M50 44 C 36 52, 26 56, 14 58",
          ].map((d, i) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              stroke="var(--color-primary)"
              strokeWidth="0.35"
              strokeDasharray="1"
              className="smm-trail"
              style={{ animationDelay: `${900 + i * 90}ms` }}
            />
          ))}
        </svg>

        {/* Pallini che escono dal telefono, orbitano e si posano */}
        {ORBS.map((orb) => (
          <span
            key={`${orb.ox}${orb.oy}`}
            aria-hidden="true"
            className="smm-orb absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-primary"
            style={
              {
                "--ox": orb.ox,
                "--oy": orb.oy,
                animationDelay: `${800 + orb.delay}ms`,
                boxShadow: "0 0 12px 2px color-mix(in oklab, var(--color-primary) 60%, transparent)",
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8">
        {LABELS.map((label, i) => (
          <span
            key={label}
            className="smm-label font-display text-[0.6875rem] tracking-[0.24em] text-muted-foreground"
            style={{ animationDelay: `${3800 + i * 220}ms` }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
