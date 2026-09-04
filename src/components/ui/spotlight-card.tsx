import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card con riflettore che segue il puntatore (pattern "spotlight" di
 * Aceternity, riscritto senza dipendenze: due variabili CSS e un overlay in
 * `radial-gradient`, vedi `.spotlight-card` in styles.css).
 *
 * Il puntatore illumina un elemento per volta: è lo stesso gesto del mirino
 * di `FocusShift` — il fuoco si sposta su ciò che c'è già nel locale.
 *
 * L'overlay resta spento su touch: senza `hover` il riflettore si fermerebbe
 * dove è avvenuto l'ultimo tocco e non si spegnerebbe più.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      onPointerMove={(event: PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      }}
      className={cn(
        "spotlight-card surface-card relative isolate flex flex-col overflow-hidden hover:border-primary/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
