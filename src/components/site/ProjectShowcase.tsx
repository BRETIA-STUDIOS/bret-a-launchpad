import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { useShouldAnimate } from "@/hooks/use-should-animate";
import { cn } from "@/lib/utils";
import osteriaNova from "@/assets/osteria-nova.png";
import studioLumePreview from "@/assets/lume/studio-lume-preview.png.asset.json";

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
    image: osteriaNova,
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
  duplicate = false,
}: {
  project: ShowcaseProject;
  compact?: boolean;
  movedRef?: React.MutableRefObject<boolean>;
  /** Seconda copia del nastro: serve solo al loop visivo. */
  duplicate?: boolean;
}) {
  return (
    <article
      // La copia esiste per far scorrere il nastro senza stacchi. Nasconderla
      // agli screen reader evita che ogni progetto venga annunciato due volte.
      aria-hidden={duplicate || undefined}
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
        <p className="label-eyebrow text-brand">{project.category}</p>
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
            <span className="text-xs uppercase tracking-[0.28em]">A concept by</span>
            <BretiaSymbol variant="white" className="h-3.5 w-auto opacity-70" />
            <span className="font-display text-[0.75rem] font-semibold tracking-[0.16em] text-foreground/80">
              BRETÌA
            </span>
          </div>
          {project.to ? (
            <span className="text-xs uppercase tracking-[0.28em] text-brand">
              Apri il progetto →
            </span>
          ) : null}
        </div>
      </div>

      {project.to ? (
        <Link
          to={project.to}
          aria-label={`Apri il progetto ${project.title}`}
          // La copia resta fuori dal tab order: altrimenti si tabberebbe due
          // volte sugli stessi progetti.
          tabIndex={duplicate ? -1 : undefined}
          className="absolute inset-0 z-10 rounded-[var(--radius-2xl)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
  // Il nastro scorre solo mentre è davvero sullo schermo e la scheda è attiva.
  const { ref: viewportRef, shouldAnimate } = useShouldAnimate<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  /** px ancora da percorrere per il salto avviato dalle frecce. */
  const glideRef = useRef(0);
  /*
   * Lo scorrimento si ferma finché almeno uno di questi è attivo. Tenerli
   * separati evita il bug classico del flag unico: uscire col mouse mentre
   * il focus è ancora dentro (o viceversa) faceva ripartire il nastro.
   */
  const holdsRef = useRef({ hover: false, focus: false, drag: false });
  const reduceRef = useRef(false);
  const dragRef = useRef<{ active: boolean; startX: number; startOffset: number }>({
    active: false,
    startX: 0,
    startOffset: 0,
  });
  const movedRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reduceRef.current = mq.matches;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    // Fuori schermo o scheda in secondo piano: nessun loop attivo, zero CPU.
    if (!track || !shouldAnimate) return;

    let raf = 0;
    let last = performance.now();

    // scrollWidth conta 2 copie separate da un gap in meno rispetto al periodo
    // reale del loop: senza il gap il nastro salta di mezzo gap ad ogni giro.
    const loopWidth = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return (track.scrollWidth + gap) / 2 || 1;
    };

    const tick = (now: number) => {
      // dt limitato: al ritorno da una scheda in secondo piano `now - last`
      // vale svariati secondi e il nastro farebbe un balzo.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const holds = holdsRef.current;

      if (glideRef.current !== 0) {
        // Salto da tastiera: decelerazione esponenziale fino a destinazione.
        const stepPx = glideRef.current * Math.min(1, dt * 9);
        offsetRef.current += stepPx;
        glideRef.current -= stepPx;
        if (Math.abs(glideRef.current) < 0.5) {
          offsetRef.current += glideRef.current;
          glideRef.current = 0;
        }
      } else if (!holds.hover && !holds.focus && !holds.drag && !reduceRef.current) {
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
  }, [speed, shouldAnimate]);

  /** Alternativa al trascinamento per chi non usa il mouse: una card per volta. */
  const move = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = (card.getBoundingClientRect().width + gap) * -direction;
    if (reduceRef.current) {
      offsetRef.current += distance;
    } else {
      glideRef.current += distance;
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current };
    movedRef.current = false;
    holdsRef.current.drag = true;
    glideRef.current = 0;
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 6 && !movedRef.current) {
      // Only capture once it is a real drag, so plain clicks still reach the card link.
      movedRef.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    }
    offsetRef.current = dragRef.current.startOffset + dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setDragging(false);
    holdsRef.current.drag = false;
    const el = e.currentTarget as HTMLElement;
    if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId);
    window.setTimeout(() => {
      movedRef.current = false;
    }, 120);
  };

  const items = [...SHOWCASE_PROJECTS, ...SHOWCASE_PROJECTS];

  return (
    /*
     * Nessun comando visibile: la striscia è essa stessa il comando. Riceve il
     * focus da tastiera e le frecce ← → la fanno scorrere di una card per
     * volta, così chi naviga senza mouse non resta tagliato fuori. Il focus e
     * il passaggio del mouse fermano lo scorrimento automatico.
     */
    <div
      ref={viewportRef}
      role="group"
      aria-label="Progetti in evidenza. Usa le frecce sinistra e destra per scorrere."
      tabIndex={0}
      className={cn(
        "relative w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          move(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          move(-1);
        }
      }}
      onMouseEnter={() => {
        holdsRef.current.hover = true;
      }}
      onMouseLeave={() => {
        holdsRef.current.hover = false;
      }}
      onFocus={() => {
        holdsRef.current.focus = true;
      }}
      onBlur={(e) => {
        // Spostarsi da una card all'altra non deve far ripartire il nastro.
        if (!e.currentTarget.contains(e.relatedTarget)) {
          holdsRef.current.focus = false;
        }
      }}
    >
      <div
        className={cn("flex w-max gap-5 sm:gap-6", dragging ? "cursor-grabbing" : "cursor-grab")}
        style={{ touchAction: "pan-y" }}
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTouchStart={() => {
          holdsRef.current.drag = true;
        }}
        onTouchEnd={() => {
          holdsRef.current.drag = false;
        }}
      >
        {items.map((project, i) => (
          <ProjectCard
            key={`${project.id}-${i}`}
            project={project}
            compact={compact}
            movedRef={movedRef}
            duplicate={i >= SHOWCASE_PROJECTS.length}
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
