import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Reveal as="p" className="label-eyebrow">
          {eyebrow}
        </Reveal>
      ) : null}
      <Reveal
        as="h2"
        delay={80}
        className="mt-5 text-balance text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-5xl"
      >
        {title}
      </Reveal>
      {description ? (
        <Reveal
          as="p"
          delay={140}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {description}
        </Reveal>
      ) : null}
    </div>
  );
}
