import symbolColor from "@/assets/brand/symbol_color.png.asset.json";
import symbolWhite from "@/assets/brand/symbol.png.asset.json";
import { cn } from "@/lib/utils";

type BretiaSymbolProps = {
  className?: string;
  title?: string;
  /** Official colored symbol (default) or the official white variant. */
  variant?: "color" | "white";
};

/**
 * Official BRETÌA symbol. Rendered from the official brand asset —
 * never redrawn, never distorted (aspect ratio is preserved).
 */
export function BretiaSymbol({ className, title, variant = "color" }: BretiaSymbolProps) {
  const src = variant === "white" ? symbolWhite.url : symbolColor.url;
  return (
    <img
      src={src}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      width={202}
      height={264}
      loading="lazy"
      decoding="async"
      className={cn("h-8 w-auto object-contain", className)}
    />
  );
}
