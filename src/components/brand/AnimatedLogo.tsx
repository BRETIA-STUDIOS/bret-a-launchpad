import symbolColor from "@/assets/brand/symbol_color.png.asset.json";
import wordmark from "@/assets/brand/wordmark.png.asset.json";
import descriptor from "@/assets/brand/descriptor.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * One-time entrance of the OFFICIAL BRETÌA logo assets:
 * symbol fades + scales in, settles, then the wordmark and the
 * "WEB STUDIO" descriptor fade in. ~1.35s total. Never loops.
 * Honors prefers-reduced-motion (static official logo).
 */
export function AnimatedLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <img
        src={symbolColor.url}
        alt="BRETÌA"
        width={541}
        height={694}
        fetchPriority="high"
        decoding="async"
        className="anim-symbol h-24 w-auto object-contain sm:h-28"
      />
      <img
        src={wordmark.url}
        alt=""
        aria-hidden="true"
        width={520}
        height={86}
        className="anim-wordmark mt-7 h-[1.6rem] w-auto object-contain sm:h-8"
      />
      <img
        src={descriptor.url}
        alt=""
        aria-hidden="true"
        width={525}
        height={29}
        className="anim-descriptor mt-3 h-[0.6rem] w-auto object-contain sm:h-3"
      />
      <span className="sr-only">BRETÌA Web Studio</span>
    </div>
  );
}
