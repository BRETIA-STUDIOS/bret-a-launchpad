import { cn } from "@/lib/utils";

type BretiaSymbolProps = {
  className?: string;
  title?: string;
  /** Adds the one-time interweave entrance animation to the two ribbons. */
  animated?: boolean;
};

/**
 * BRETÌA official mark: two rounded ribbon elements that interweave into a
 * single continuous geometric symbol.
 */
export function BretiaSymbol({ className, title, animated = false }: BretiaSymbolProps) {
  const maskId = "bretia-weave-mask";

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-8 w-8", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="100" height="100" fill="white" />
          {/* Cut a notch so ribbon B passes behind ribbon A at the crossing */}
          <path
            d="M50 26 v48"
            stroke="black"
            strokeWidth="17"
            strokeLinecap="round"
            transform="translate(-9 0)"
          />
        </mask>
      </defs>

      {/* Ribbon A — opens to the left */}
      <path
        d="M28 28 H50 a22 22 0 0 1 0 44 H28"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "anim-join-left" : undefined}
      />

      {/* Ribbon B — opens to the right, woven through A */}
      <g mask={`url(#${maskId})`}>
        <path
          d="M72 72 H50 a22 22 0 0 1 0 -44 H72"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? "anim-join-right" : undefined}
          opacity="0.85"
        />
      </g>
    </svg>
  );
}
