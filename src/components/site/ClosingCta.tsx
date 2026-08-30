import type { ReactNode } from "react";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { BrandButton } from "@/components/ui-brand/BrandButton";
import { Reveal } from "@/components/ui-brand/Reveal";
import { cn } from "@/lib/utils";

type ClosingCtaProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  ctaLabel?: string;
  to?: string;
  className?: string;
};

/**
 * BRETÌA signature closing section — the consistent final CTA that ends
 * every page. The official symbol sits very large behind the content,
 * partially cropped by the section edges, at low opacity so it reads as
 * a watermark and never competes with the text or button.
 */
export function ClosingCta({
  eyebrow,
  title,
  description,
  ctaLabel = "Parliamone",
  to = "/contatti",
  className,
}: ClosingCtaProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-border bg-surface/40 py-24 text-center sm:py-32 lg:py-40",
        className,
      )}
    >
      {/* Decorative symbol — oversized, cropped by the section edges */}
      <BretiaSymbol
        className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.05] sm:h-[34rem] lg:h-[44rem]"
      />
      <div className="container-brand relative">
        {eyebrow ? (
          <Reveal as="p" className="label-eyebrow">
            {eyebrow}
          </Reveal>
        ) : null}
        <Reveal
          as="h2"
          delay={eyebrow ? 60 : 0}
          className={cn(
            "text-balance font-display font-semibold leading-[1.05]",
            eyebrow ? "mt-6" : undefined,
            "text-3xl sm:text-5xl lg:text-6xl",
          )}
        >
          {title}
        </Reveal>
        {description ? (
          <Reveal
            as="p"
            delay={110}
            className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            {description}
          </Reveal>
        ) : null}
        <Reveal delay={190} className="mt-10">
          <BrandButton to={to} size="lg">
            {ctaLabel}
          </BrandButton>
        </Reveal>
      </div>
    </section>
  );
}
