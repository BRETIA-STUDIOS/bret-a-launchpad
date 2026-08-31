import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Ciclo di vita dell'entrata in scena.
 * `will-change` vive solo nella fase `animating`: tenerlo sempre attivo
 * costringerebbe il browser a mantenere un livello di composizione per ogni
 * elemento rivelato, per tutta la durata della pagina.
 */
type Phase = "hidden" | "animating" | "done";

/** Margine oltre la durata della transizione, per la rete di sicurezza. */
const SETTLE_GRACE_MS = 900;

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setPhase("animating");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase("animating");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "animating") return;
    const node = ref.current;
    const settle = () => setPhase("done");

    node?.addEventListener("transitionend", settle, { once: true });
    // Se la transizione non parte affatto — elemento già a destinazione,
    // motion ridotto, transizione interrotta — `transitionend` non arriva e
    // `will-change` resterebbe attaccato per sempre: proprio il difetto che
    // stiamo togliendo.
    const timer = window.setTimeout(settle, delay + SETTLE_GRACE_MS);

    return () => {
      node?.removeEventListener("transitionend", settle);
      window.clearTimeout(timer);
    };
  }, [phase, delay]);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "reveal",
        phase !== "hidden" && "reveal-in",
        phase === "animating" && "reveal-animating",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
