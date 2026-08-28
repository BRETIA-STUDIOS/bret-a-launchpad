import { Link } from "@tanstack/react-router";
import logoFull from "@/assets/brand/full.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * Official BRETÌA logo (symbol + wordmark + descriptor), used in the header.
 * The official asset is used as provided; only its rendered size changes.
 */
export function Logo({ className }: { className?: string; showDescriptor?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="BRETÌA Web Studio — home"
      className={cn(
        "inline-flex items-center transition-opacity duration-200 hover:opacity-80",
        className,
      )}
    >
      <img
        src={logoFull.url}
        alt="BRETÌA Web Studio"
        width={525}
        height={412}
        className="h-11 w-auto object-contain sm:h-12"
      />
    </Link>
  );
}
