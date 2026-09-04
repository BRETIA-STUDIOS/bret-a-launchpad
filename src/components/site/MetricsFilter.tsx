import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Eye, Heart, MapPin, MessageSquare, TrendingUp } from "lucide-react";
import { useShouldAnimate } from "@/hooks/use-should-animate";
import { cn } from "@/lib/utils";

/** I numeri che si guardano per abitudine: entrano barrati e in sordina. */
const VANITY = [
  { icon: Heart, label: "Like" },
  { icon: Eye, label: "Visualizzazioni" },
  { icon: TrendingUp, label: "Follower" },
];

/** Ritardi della sequenza, in millisecondi. */
const T = {
  vanity: 120,
  vanityStep: 90,
  beam: 620,
  value: 1000,
} as const;

/**
 * Sollevamento al passaggio del mouse: la card riceve l'hover, i figli si
 * alzano di poco e in ordine. Le varianti si propagano dal genitore, quindi
 * basta un `whileHover` solo.
 */
const LIFT_PARENT = { rest: {}, lift: {} };
const lift = (y: number) => ({ rest: { y: 0 }, lift: { y } });

/**
 * Il filtro: in alto gli indicatori di superficie, in basso ciò che serve
 * davvero all'attività. Fra i due, una linea tratteggiata percorsa da un
 * fascio che scende — quello che passa il filtro è la parte illuminata.
 *
 * Le entrate a dissolvenza restano quelle CSS del resto della pagina
 * (`.smm-fade-item`, `.smm-card`); framer-motion serve solo dove il CSS non
 * arriva: la molla della barra e il sollevamento all'hover.
 */
export function MetricsFilter() {
  const { ref: stageRef, shouldAnimate } = useShouldAnimate<HTMLDivElement>();
  const [entered, setEntered] = useState(false);
  // Le animazioni di framer-motion sono inline: il blocco
  // `prefers-reduced-motion` di styles.css non le tocca, vanno spente qui.
  const reduceMotion = useReducedMotion();

  // Latch: parte una volta sola al primo affaccio, non torna più indietro.
  useEffect(() => {
    if (shouldAnimate) setEntered(true);
  }, [shouldAnimate]);

  const active = entered;

  return (
    <div ref={stageRef} aria-hidden="true" className="mx-auto w-full max-w-[36rem]">
      {/* INDICATORI SUPERFICIALI */}
      <div className={cn("smm-card surface-card p-6 sm:p-7", active && "is-in")}>
        <span className="label-eyebrow text-muted-foreground/70">Indicatori superficiali</span>
        <ul className="mt-5 flex list-none flex-wrap gap-2.5">
          {VANITY.map(({ icon: Icon, label }, i) => (
            <li
              key={label}
              className={cn("smm-fade-item", active && "is-in")}
              style={{ animationDelay: `${T.vanity + i * T.vanityStep}ms` }}
            >
              <span className="flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground/55">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                <span className="line-through decoration-muted-foreground/40">{label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* IL FILTRO — tratteggio percorso da un fascio che scende */}
      <div
        className={cn("smm-fade-item relative mx-auto h-20 w-px", active && "is-in")}
        style={{ animationDelay: `${T.beam}ms` }}
      >
        <span className="absolute inset-0 border-l border-dashed border-border-strong" />
        <span
          className={cn(
            "smm-beam absolute -left-px h-8 w-0.5 rounded-full bg-primary",
            !shouldAnimate && "is-paused",
          )}
        />
      </div>

      {/* VALORE UTILE ALL'ATTIVITÀ */}
      <motion.div
        variants={LIFT_PARENT}
        initial="rest"
        animate="rest"
        {...(reduceMotion ? {} : { whileHover: "lift" })}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={cn(
          "smm-fade-item smm-value-card surface-card border-primary/40 p-6 sm:p-7",
          active && "is-in",
        )}
        style={{ animationDelay: `${T.value}ms` }}
      >
        <span className="label-eyebrow text-brand">Valore per l'attività</span>

        {/* CONTATTI — il messaggio che arriva davvero */}
        <motion.div
          variants={lift(-3)}
          className="mt-6 flex items-center gap-4 rounded-xl border border-border bg-surface-2/50 p-4"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 shadow-[0_0_18px_-4px_var(--color-primary)]">
            <MessageSquare className="h-4.5 w-4.5 text-primary" strokeWidth={1.5} />
          </span>
          <span>
            <span className="block font-display text-lg font-semibold text-foreground">
              +38 <span className="text-base font-normal">Prenotazioni e contatti diretti</span>
            </span>
          </span>
          <span className="ml-auto shrink-0 rounded-full border border-primary/40 px-2.5 py-1 font-display text-xs tracking-[0.08em] text-brand">
            +28% questo mese
          </span>
        </motion.div>

        {/* TERRITORIO — la barra si riempie con una molla, non a scatto */}
        <motion.div variants={lift(-2)} className="mt-4 rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
            <span className="text-base text-foreground/90">Copertura sul territorio locale</span>
            <span className="ml-auto font-display text-base font-semibold text-brand">92%</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: active ? "92%" : "0%" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 48, damping: 16, delay: 1.2 }
              }
              className="h-full rounded-full bg-gradient-to-r from-primary/30 via-primary to-accent shadow-[0_0_12px_-2px_var(--color-primary)]"
            />
          </div>
        </motion.div>

        <motion.div
          variants={lift(-1)}
          className="mt-6 flex items-center gap-3 border-t border-border pt-5"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full bg-primary opacity-75",
                active && shouldAnimate && "animate-ping",
              )}
            />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span className="text-sm text-muted-foreground">Presenza solida e costante</span>
          <CheckCircle2 className="ml-auto h-4 w-4 text-primary" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </div>
  );
}
