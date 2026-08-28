import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { cn } from "@/lib/utils";

/**
 * Minimal reusable signature for BRETÌA-built client websites:
 * "powered by [BRETÌA symbol]".
 */
export function Signature({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-[0.6875rem] tracking-[0.16em] text-muted-foreground transition-colors duration-200 hover:text-foreground",
        className,
      )}
      aria-label="powered by BRETÌA"
    >
      <span>powered by</span>
      <BretiaSymbol className="h-4 w-4 text-primary" />
      <span className="sr-only">BRETÌA</span>
    </a>
  );
}
