import { Link } from "@tanstack/react-router";
import { BretiaSymbol } from "./BretiaSymbol";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showDescriptor = true,
}: {
  className?: string;
  showDescriptor?: boolean;
}) {
  return (
    <Link
      to="/"
      aria-label="BRETÌA Web Studio — home"
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-80",
        className,
      )}
    >
      <BretiaSymbol className="h-8 w-8 text-primary transition-transform duration-500 ease-[var(--ease-brand)] group-hover:rotate-180" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-[0.16em]">BRETÌA</span>
        {showDescriptor ? (
          <span className="mt-1 text-[0.5625rem] tracking-[0.32em] text-muted-foreground">
            WEB STUDIO
          </span>
        ) : null}
      </span>
    </Link>
  );
}
