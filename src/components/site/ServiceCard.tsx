import { Reveal } from "@/components/ui-brand/Reveal";

export function ServiceCard({
  index,
  title,
  description,
  delay = 0,
}: {
  index: string;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="surface-card group flex h-full flex-col p-7 hover:-translate-y-1 hover:border-primary/50 sm:p-9">
        <span className="font-display text-xs tracking-[0.3em] text-primary">{index}</span>
        <h3 className="mt-6 font-display text-xl font-semibold tracking-[0.04em] sm:text-2xl">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
        <span
          aria-hidden="true"
          className="mt-8 block h-px w-12 bg-border-strong transition-all duration-[var(--transition-base)] group-hover:w-24 group-hover:bg-primary"
        />
      </article>
    </Reveal>
  );
}
