import { useId } from "react";
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
  const uid = useId().replace(/:/g, "");
  const clipId = `bretia-weave-${uid}`;

  // Two rounded ribbon loops, offset diagonally, woven into one mark
  const ribbonA = "M40 24 a22 22 0 1 0 0 44 a22 22 0 1 0 0 -44 z";
  const ribbonB = "M60 32 a22 22 0 1 1 0 44 a22 22 0 1 1 0 -44 z";

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
        <clipPath id={clipId}>
          {/* Top crossing zone: ribbon A passes over ribbon B here */}
          <rect x="30" y="12" width="34" height="34" />
        </clipPath>
      </defs>

      <g className={animated ? "anim-join-left" : undefined}>
        <path
          d={ribbonA}
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g className={animated ? "anim-join-right" : undefined}>
        <path
          d={ribbonB}
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </g>

      {/* Re-draw A over B at the top crossing to create the weave */}
      <g clipPath={`url(#${clipId})`} className={animated ? "anim-join-left" : undefined}>
        <path
          d={ribbonA}
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
