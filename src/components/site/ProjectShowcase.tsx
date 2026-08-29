import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { cn } from "@/lib/utils";
import osteriaNova from "@/assets/osteria-nova.png.asset.json";

export type ShowcaseProject = {
  id: string;
  title: string;
  category: string;
  description?: string;
  image?: string;
  placeholder?: boolean;
  to?: string;
};

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "osteria-nova",
    title: "OSTERIA NÒVA",
    category: "Restaurant · Web Design · UI/UX · Branding",
    description:
      "Un'esperienza digitale costruita attorno all'atmosfera, alla cucina e all'identità di un ristorante italiano contemporaneo.",
    image: osteriaNova.url,
    to: "/portfolio/osteria-nova",
  },
  {
    id: "concept-1",
    title: "CONCEPT PROJECT",
    category: "Web Design · UI/UX",
    placeholder: true,
  },
  {
    id: "concept-2",
    title: "CONCEPT PROJECT",
    category: "Branding · Web Design",
    placeholder: true,
  },
];

function ProjectCard({
  project,
  compact,
  movedRef,
}: {
  project: ShowcaseProject;
  compact?: boolean;
  movedRef?: React.MutableRefObject<boolean>;
}) {
  return (
    <article
      className={cn(
        "group relative shrink-0 overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-surface transition-colors duration-[var(--transition-base)] hover:border-primary/50",
        compact
          ? "w-[80vw] max-w-[42rem] sm:w-[36rem] lg:w-[44rem]"
          : "w-[84vw] max-w-[56rem] sm:w-[42rem] lg:w-[54rem]",
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden bg-surface-2">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} — concept BRETÌA`}
            draggable={false}
            loading="lazy"
            className="h-full w-full select-none object-cover opacity-95 transition-transform duration-[var(--transition-slow)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40"
              style={{ background: "var(--gradient-veil)" }}
            />
            <div className="relative flex flex-col items-center gap-4 text-center">
              <BretiaSymbol variant="white" className="h-10 w-auto opacity-25" />
              <span className="label-eyebrow text-muted-foreground">PROSSIMAMENTE</span>
            </div>
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent"
        />
      </div>

      <div className="flex flex-col gap-3 p-6 sm:p-8">
        <p className="label-eyebrow text-primary">{project.category}</p>
        <h3 className="font-display text-xl font-semibold tracking-[0.14em] sm:text-2xl">
          {project.title}
        </h3>
        {project.description ? (
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-muted-foreground/80">
            <span className="text-[0.5625rem] uppercase tracking-[0.28em]">A concept by</span>
            <BretiaSymbol variant="white" className="h-3.5 w-auto opacity-70" />
            <span className="font-display text-[0.75rem] font-semibold tracking-[0.16em] text-foreground/80">
              BRETÌA
            </span>
          </div>
          {project.to ? (
            <span className="text-[0.5625rem] uppercase tracking-[0.28em] text-primary">
              Apri il progetto →
            </span>
          ) : null}
        </div>
      </div>

      {project.to ? (
        <Link
          to={project.to}
          aria-label={`Apri il progetto ${project.title}`}
          className="absolute inset-0 z-10 rounded-[var(--radius-2xl)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={(e) => {
            if (movedRef?.current) e.preventDefault();
          }}
        />
      ) : null}
    </article>
  );
}

export function ProjectShowcase({
  compact = false,
  className,
  speed = 26,
}: {
  compact?: boolean;
  className?: string;
  /** px per second */
  speed?: number;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const dragRef = useRef<{ active: boolean; startX: number; startOffset: number }>({
    active: false,
    startX: 0,
    startOffset: 0,
  });
  const movedRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = performance.now();

    const loopWidth = () => track.scrollWidth / 2 || 1;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && !reduce) {
        offsetRef.current -= speed * dt;
      }
      const w = loopWidth();
      if (offsetRef.current <= -w) offsetRef.current += w;
      if (offsetRef.current > 0) offsetRef.current -= w;
      track.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current };
    movedRef.current = false;
    pausedRef.current = true;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 6) movedRef.current = true;
    offsetRef.current = dragRef.current.startOffset + dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setDragging(false);
    pausedRef.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    window.setTimeout(() => {
      movedRef.current = false;
    }, 120);
  };

  const items = [...SHOWCASE_PROJECTS, ...SHOWCASE_PROJECTS];


  return (
    <div
      ref={viewportRef}
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        if (!dragRef.current.active) pausedRef.current = false;
      }}
    >
      <div
        className={cn(
          "flex w-max gap-5 sm:gap-6",
          dragging ? "cursor-grabbing" : "cursor-grab",
        )}
        style={{ touchAction: "pan-y" }}
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTouchStart={() => {
          pausedRef.current = true;
        }}
        onTouchEnd={() => {
          pausedRef.current = false;
        }}
      >
        {items.map((project, i) => (
          <ProjectCard
            key={`${project.id}-${i}`}
            project={project}
            compact={compact}
            movedRef={movedRef}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-background to-transparent sm:w-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-background to-transparent sm:w-20"
      />
    </div>
  );
}
