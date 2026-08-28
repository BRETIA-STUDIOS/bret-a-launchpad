import poweredBy from "@/assets/brand/poweredby.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * Official BRETÌA "powered by" signature, reusable on client websites.
 * Uses the official brand asset as provided.
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
      aria-label="powered by BRETÌA"
      className={cn(
        "inline-flex opacity-80 transition-opacity duration-200 hover:opacity-100",
        className,
      )}
    >
      <img
        src={poweredBy.url}
        alt="powered by BRETÌA"
        width={625}
        height={197}
        loading="lazy"
        decoding="async"
        className="h-9 w-auto object-contain sm:h-10"
      />
    </a>
  );
}
