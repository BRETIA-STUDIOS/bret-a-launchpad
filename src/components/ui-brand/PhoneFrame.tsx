import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scocca dello smartphone: doppio bordo (telaio + schermo) e dynamic island.
 *
 * È qui e non dentro un singolo mockup perché la usano in due — la hero
 * social e il rimando al servizio nella pagina Servizi — e i due telefoni
 * devono avere gli stessi raggi e la stessa isola, altrimenti si leggono
 * come due oggetti diversi.
 */
export function PhoneFrame({
  children,
  className,
  screenClassName,
  glow = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  screenClassName?: string;
  /** Bordo luminoso sull'accento: acceso solo dove il telefono è il soggetto. */
  glow?: boolean;
  role?: string;
  "aria-label"?: string;
}) {
  return (
    <div
      {...rest}
      className={cn(
        "relative aspect-[9/19] rounded-[2.25rem] border border-border bg-surface p-2.5 shadow-[0_30px_60px_-30px_var(--background)]",
        glow && "smm-hero-card",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-background",
          screenClassName,
        )}
      >
        {/* Dynamic island. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2.5 z-10 h-2.5 w-16 -translate-x-1/2 rounded-full bg-surface-2"
        />
        {children}
      </div>
    </div>
  );
}
