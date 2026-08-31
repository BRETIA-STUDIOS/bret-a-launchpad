import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { cn } from "@/lib/utils";

/**
 * Official BRETÌA "powered by" signature — reusable on client websites.
 * Composed with the official symbol asset (never redrawn) plus type,
 * so it sits natively on any surface instead of looking like a pasted badge.
 */
export function Signature({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <a
      href={href}
      aria-label="powered by BRETÌA"
      className={cn(
        // py-1 porta l'area cliccabile a 28px: sotto i 24px richiesti da
        // WCAG 2.5.8 il link sarebbe difficile da centrare col dito.
        "group inline-flex items-center gap-2.5 py-1 text-muted-foreground transition-colors duration-[var(--transition-fast)] hover:text-foreground",
        className,
      )}
    >
      <span className="text-xs uppercase tracking-[0.28em]">powered by</span>
      <span className="flex items-center gap-1.5">
        <BretiaSymbol className="h-4 w-auto opacity-80 transition-opacity duration-[var(--transition-fast)] group-hover:opacity-100" />
        <span className="font-display text-[0.8125rem] font-semibold tracking-[0.16em] text-foreground/85 transition-colors duration-[var(--transition-fast)] group-hover:text-foreground">
          BRETÌA
        </span>
      </span>
    </a>
  );
}
