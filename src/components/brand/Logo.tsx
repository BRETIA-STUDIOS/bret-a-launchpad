import { Link } from "@tanstack/react-router";
import symbolWhite from "@/assets/brand/symbol.png.asset.json";
import wordmark from "@/assets/brand/wordmark.png.asset.json";
import descriptor from "@/assets/brand/descriptor.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * Official BRETÌA logo lockup for the header, built from the official
 * brand assets (white variant). Assets are never redrawn or distorted:
 * width is always auto so the aspect ratio is preserved.
 */
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
        "inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-80",
        className,
      )}
    >
      <img
        src={symbolWhite.url}
        alt=""
        aria-hidden="true"
        width={202}
        height={264}
        className="h-9 w-auto object-contain sm:h-10"
      />
      <span className="flex flex-col items-start">
        <img
          src={wordmark.url}
          alt="BRETÌA"
          width={520}
          height={86}
          className="h-[0.9rem] w-auto object-contain sm:h-4"
        />
        {showDescriptor ? (
          <img
            src={descriptor.url}
            alt=""
            aria-hidden="true"
            width={525}
            height={29}
            className="mt-1.5 h-[0.4rem] w-auto object-contain"
          />
        ) : null}
      </span>
    </Link>
  );
}
