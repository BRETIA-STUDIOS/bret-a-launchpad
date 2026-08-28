import { Reveal } from "@/components/ui-brand/Reveal";

export function PortfolioCard({
  title,
  caption,
  image,
  delay = 0,
}: {
  title: string;
  caption: string;
  image: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative h-full overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-surface transition-all duration-[var(--transition-base)] hover:-translate-y-1 hover:border-primary/50">
        {/* Replaceable image container */}
        <div className="relative aspect-4/5 overflow-hidden bg-surface-2">
          <img
            src={image}
            alt={`Concept ${title} — progetto BRETÌA`}
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition-all duration-[var(--transition-slow)] group-hover:scale-105 group-hover:opacity-100"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-background via-background/25 to-transparent"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="label-eyebrow text-primary">CONCEPT / BRETÌA</p>
          <h3 className="mt-3 font-display text-xl font-semibold tracking-[0.14em] sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{caption}</p>
        </div>
      </article>
    </Reveal>
  );
}
