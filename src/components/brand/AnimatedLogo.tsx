import { BretiaSymbol } from "./BretiaSymbol";
import { cn } from "@/lib/utils";

/**
 * One-time refined entrance animation of the BRETÌA mark:
 * the two ribbons drift in, interweave, settle, then the wordmark and
 * descriptor fade in. Total ~1.4s. Never loops. Honors prefers-reduced-motion.
 */
export function AnimatedLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <BretiaSymbol
        animated
        title="Simbolo BRETÌA"
        className="h-20 w-20 text-primary sm:h-24 sm:w-24"
      />
      <p className="anim-wordmark mt-6 font-display text-2xl font-semibold tracking-[0.3em] sm:text-3xl">
        BRETÌA
      </p>
      <p className="anim-descriptor mt-3 text-[0.625rem] tracking-[0.42em] text-muted-foreground">
        WEB STUDIO
      </p>
    </div>
  );
}
