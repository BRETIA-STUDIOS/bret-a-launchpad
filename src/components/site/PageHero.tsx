import type { ReactNode } from "react";
import { Reveal } from "@/components/ui-brand/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-veil)" }}
      />
      <div className="container-brand relative">
        <Reveal as="p" className="label-eyebrow">
          {eyebrow}
        </Reveal>
        <Reveal as="h1" delay={80} className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
          {title}
        </Reveal>
        <Reveal as="p" delay={150} className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </Reveal>
      </div>
    </section>
  );
}
