import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";
import { LUME_FONTS_HREF } from "@/lib/fonts";
import lumeLogo from "@/assets/lume/studio-lume-logo-light.png.asset.json";
import lumeHero from "@/assets/lume/studio-lume-hero.png.asset.json";
import lumeExterior from "@/assets/lume/studio-lume-exterior.png.asset.json";
import lumeInterior from "@/assets/lume/studio-lume-interior.png.asset.json";
import lumeProducts from "@/assets/lume/studio-lume-products.png.asset.json";
import lumeLavaggio from "@/assets/lume/studio-lume-lavaggio.png.asset.json";
import lumeStyling from "@/assets/lume/studio-lume-styling.png.asset.json";
import lumePrima from "@/assets/lume/studio-lume-prima.png.asset.json";
import lumeDopo from "@/assets/lume/studio-lume-dopo.png.asset.json";

export const Route = createFileRoute("/portfolio/studio-lume")({
  head: () =>
    pageHead({
      path: "/portfolio/studio-lume",
      title: "Studio Lume Hair Atelier — Concept BRETÌA",
      description:
        "Concept dimostrativo di un hair atelier italiano di alta gamma: salone, servizi, team e prenotazione. Progetto realizzato da BRETÌA Web Studio.",
      ogDescription:
        "La bellezza prende forma, insieme a te. Un concept digitale per un hair atelier italiano contemporaneo.",
      extraLinks: [{ rel: "stylesheet", href: LUME_FONTS_HREF }],
    }),
  component: StudioLume,
});

/* ---------------------------------- data --------------------------------- */

const NAV = [
  { id: "salone", label: "Il Salone" },
  { id: "servizi", label: "Servizi" },
  { id: "team", label: "Il Team" },
  { id: "prenota", label: "Prenota" },
  { id: "contatti", label: "Contatti" },
];

const SERVIZI = [
  {
    title: "Taglio",
    caption:
      "Linee studiate, proporzioni e tecnica per un taglio che valorizza il tuo viso e il tuo stile.",
  },
  {
    title: "Colore",
    caption: "Colore, tonalità e sfumature costruite per armonizzarsi con la tua persona.",
  },
  {
    title: "Styling",
    caption: "Texture, movimento e forma per completare il tuo look con naturalezza.",
  },
  { title: "Trattamenti", caption: "Rituali dedicati alla salute e alla bellezza del capello." },
];


const TEAM = [
  { name: "Andrea", role: "Owner" },
  { name: "Giuseppe", role: "Member" },
  { name: "Matteo", role: "Member" },
];

/* ------------------------------ reveal helper ----------------------------- */

function SlReveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: "div" | "p" | "h1" | "h2" | "h3" | "span" | "li";
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref polimorfico su un tag dinamico
      ref={ref}
      className={cn("sl-reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ----------------------------- prima / dopo ------------------------------ */

function BeforeAfter() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const afterRef = useRef<HTMLDivElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);

  const valueRef = useRef(50);
  const manualRef = useRef(false);
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!track || !frame) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = (v: number) => {
      valueRef.current = v;
      if (afterRef.current) afterRef.current.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
      if (dividerRef.current) dividerRef.current.style.left = `${v}%`;
      if (handleRef.current) {
        handleRef.current.setAttribute("aria-valuenow", String(Math.round(v)));
        handleRef.current.setAttribute("aria-valuetext", `${Math.round(v)}% dopo`);
      }
    };

    // Inizio: 100% PRIMA / 0% DOPO (50/50 solo con reduced-motion, senza scroll-driven)
    apply(reduced ? 50 : 0);

    /* --- scroll driven --- */
    const readScroll = () => {
      rafRef.current = null;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const raw = (0 - rect.top) / total;
      const p = Math.min(1, Math.max(0, raw));
      // ease the middle so 50/50 sits at mid-scroll
      const target = p * 100;
      if (manualRef.current) {
        // resume only when scroll target meets the manual value (no jump)
        if (Math.abs(target - valueRef.current) < 2.5) manualRef.current = false;
        return;
      }
      apply(target);
    };

    const onScroll = () => {
      if (draggingRef.current) return;
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(readScroll);
    };

    if (!reduced) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
    }

    /* --- pointer drag --- */
    const fromClientX = (clientX: number) => {
      const r = frame.getBoundingClientRect();
      return Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
    };

    const onPointerDown = (e: PointerEvent) => {
      draggingRef.current = true;
      manualRef.current = true;
      frame.setPointerCapture?.(e.pointerId);
      apply(fromClientX(e.clientX));
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      apply(fromClientX(e.clientX));
    };
    const endDrag = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      frame.releasePointerCapture?.(e.pointerId);
    };

    frame.addEventListener("pointerdown", onPointerDown);
    frame.addEventListener("pointermove", onPointerMove);
    frame.addEventListener("pointerup", endDrag);
    frame.addEventListener("pointercancel", endDrag);

    const onKey = (e: KeyboardEvent) => {
      const step = e.shiftKey ? 10 : 4;
      if (e.key === "ArrowLeft") {
        manualRef.current = true;
        apply(Math.max(0, valueRef.current - step));
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        manualRef.current = true;
        apply(Math.min(100, valueRef.current + step));
        e.preventDefault();
      }
    };
    handleRef.current?.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      frame.removeEventListener("pointerdown", onPointerDown);
      frame.removeEventListener("pointermove", onPointerMove);
      frame.removeEventListener("pointerup", endDrag);
      frame.removeEventListener("pointercancel", endDrag);
      handleRef.current?.removeEventListener("keydown", onKey);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={trackRef} className="sl-ba-track relative">
      <div className="sticky top-0 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-[72rem] px-5 py-16 sm:px-8">
          <SlReveal>
            <div
              ref={frameRef}
              className="sl-ba-frame relative w-full touch-pan-y select-none overflow-hidden"
            >
              <img
                src={lumePrima.url}
                alt="Prima del servizio: capelli lunghi opachi e privi di forma"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <div ref={afterRef} className="absolute inset-0" style={{ clipPath: "inset(0 100% 0 0)" }}>
                <img
                  src={lumeDopo.url}
                  alt="Dopo il servizio: capelli con colore luminoso e onde definite"
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
              </div>

              <span className="sl-label pointer-events-none absolute bottom-4 left-4 opacity-75 sm:bottom-6 sm:left-6">
                Dopo
              </span>
              <span className="sl-label pointer-events-none absolute bottom-4 right-4 opacity-75 sm:bottom-6 sm:right-6">
                Prima
              </span>

              <div ref={dividerRef} className="sl-ba-divider" style={{ left: "0%" }}>
                <div
                  ref={handleRef}
                  role="slider"
                  tabIndex={0}
                  aria-label="Confronto prima e dopo"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={50}
                  aria-valuetext="50% dopo"
                  className="sl-ba-handle"
                >
                  <span aria-hidden="true">‹</span>
                  <span aria-hidden="true">›</span>
                </div>
              </div>
            </div>
          </SlReveal>
        </div>
      </div>
    </div>
  );
}


/* ------------------------------ attribuzione ------------------------------ */

function ConceptBy({ className }: { className?: string }) {
  return (
    <span className={cn("sl-concept inline-flex items-center gap-2", className)}>
      <span className="text-[0.65rem] uppercase tracking-[0.3em] opacity-60">A concept by</span>
      <BretiaSymbol variant="white" className="h-3 w-auto opacity-70" />
      <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] opacity-80">
        BRETÌA
      </span>
    </span>
  );
}

/* --------------------------------- header --------------------------------- */

function LumeHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(id), 60);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor:
          scrolled || open ? "color-mix(in oklab, #0b0a09 92%, transparent)" : "transparent",
        backdropFilter: scrolled || open ? "blur(10px)" : undefined,
        borderBottom:
          scrolled || open
            ? "1px solid color-mix(in oklab, #e9dfd1 12%, transparent)"
            : "1px solid transparent",
      }}
    >
      <div className="mx-auto grid max-w-[82rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:py-5">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="min-w-0"
          aria-label="Studio Lume Hair Atelier"
        >
          <img
            src={lumeLogo.url}
            alt="Studio Lume Hair Atelier"
            width={1272}
            height={696}
            className="sl-enter h-10 w-auto object-contain sm:h-12"
          />
        </a>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="sl-label py-1 opacity-75 transition-opacity duration-300 hover:opacity-100"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => go("prenota")}
            className="sl-btn sl-btn-outline"
          >
            Prenota ora
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 shrink-0 items-center justify-center justify-self-end lg:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className="absolute left-0 block h-px w-6 transition-transform duration-300"
              style={{
                backgroundColor: "var(--sl-champagne)",
                top: open ? "6px" : "0px",
                transform: open ? "rotate(45deg)" : "none",
              }}
            />
            <span
              className="absolute left-0 block h-px w-6 transition-transform duration-300"
              style={{
                backgroundColor: "var(--sl-champagne)",
                top: open ? "6px" : "12px",
                transform: open ? "rotate(-45deg)" : "none",
              }}
            />
          </span>
        </button>
      </div>

      <div
        className="overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden"
        style={{ maxHeight: open ? "28rem" : 0, opacity: open ? 1 : 0 }}
      >
        <nav className="flex flex-col gap-1 px-5 pb-6 sm:px-8">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="sl-serif border-b py-3.5 text-left text-2xl"
              style={{ borderColor: "color-mix(in oklab, #e9dfd1 12%, transparent)" }}
            >
              {item.label}
            </button>
          ))}
          <Link to="/portfolio" className="sl-label py-4 opacity-55">
            ← Portfolio
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------- desktop return-to-portfolio -------------------- */

function ReturnControl() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: MouseEvent) => setVisible(e.clientY < 72);
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-1/2 top-4 z-60 hidden -translate-x-1/2 transition-all duration-500 lg:block"
      style={{ opacity: visible ? 1 : 0, transform: `translate(-50%, ${visible ? "0" : "-10px"})` }}
    >
      <Link
        to="/portfolio"
        className={cn("sl-label rounded-full px-4 py-2.5", visible && "pointer-events-auto")}
        style={{
          backgroundColor: "color-mix(in oklab, #0b0a09 80%, transparent)",
          border: "1px solid color-mix(in oklab, #e9dfd1 20%, transparent)",
          color: "var(--sl-champagne)",
          backdropFilter: "blur(8px)",
        }}
      >
        ← Torna al portfolio
      </Link>
    </div>
  );
}

/* -------------------------------- placeholder ----------------------------- */

/** Riquadro tonale in attesa delle fotografie definitive del concept. */
function Frame({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("sl-frame flex items-center justify-center", className)}>
      <span className="sl-label opacity-40">{label}</span>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <SlReveal as="p" className="sl-label" delay={40}>
      <span style={{ color: "var(--sl-bronze)" }}>{children}</span>
    </SlReveal>
  );
}

/* -------------------------------- il salone ------------------------------- */

function SaloneSection() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        setShift((Math.min(Math.max(progress, 0), 1) - 0.5) * 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="salone" className="sl-band">
      <div className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div className="lg:pt-6">
            <SectionLabel>Il salone</SectionLabel>
            <SlReveal as="h2" delay={120} className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              Un luogo
              <br /> pensato per te
            </SlReveal>
            <SlReveal as="p" delay={200} className="sl-body mt-6 max-w-md">
              Un ambiente dove tecnica, cura e atmosfera si incontrano. Ogni dettaglio è pensato
              per rendere il tempo trascorso da Studio Lume parte dell&apos;esperienza.
            </SlReveal>
            <SlReveal delay={280} className="mt-8">
              <div className="sl-rule w-16" />
            </SlReveal>
          </div>

          <div ref={wrapRef}>
            <SlReveal delay={120}>
              <div className="sl-photo aspect-4/3 w-full">
                <img
                  src={lumeExterior.url}
                  alt="La vetrina illuminata di Studio Lume Hair Atelier"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 ease-out"
                  style={{ transform: `translate3d(0, ${shift}px, 0) scale(1.06)` }}
                />
              </div>
            </SlReveal>
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:items-end lg:gap-16">
          <div className="hidden lg:block" aria-hidden="true" />
          <SlReveal delay={260}>
            <div className="sl-photo aspect-3/2 w-full">
              <img
                src={lumeInterior.url}
                alt="Interno di Studio Lume: postazioni e reception in marmo scuro"
                width={1536}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="sl-label mt-4 opacity-55">Milano · Hair atelier</p>
          </SlReveal>
        </div>
      </div>
    </section>
  );
}


/* --------------------------------- servizi -------------------------------- */

function ServiziSection() {
  return (
    <section id="servizi" className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-20">
        <div>
          <SectionLabel>Servizi</SectionLabel>
          <SlReveal as="h2" delay={120} className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
            La cura
            <br /> diventa stile
          </SlReveal>
          <SlReveal as="p" delay={200} className="sl-body mt-6 max-w-md">
            Tecnica, ascolto e attenzione ai dettagli. Ogni servizio nasce per valorizzare la
            persona, non semplicemente il suo look.
          </SlReveal>

          <ul className="mt-12 border-t" style={{ borderColor: "var(--sl-line)" }}>
            {SERVIZI.map((s, i) => (
              <SlReveal as="li" key={s.title} delay={260 + i * 90} className="sl-service border-b">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-5 gap-y-2 py-6 sm:py-7">
                  <span className="sl-service-mark" aria-hidden="true" />
                  <h3 className="sl-service-title text-xl sm:text-2xl">{s.title}</h3>
                  <span aria-hidden="true" />
                  <p className="sl-body max-w-md text-sm">{s.caption}</p>
                </div>
              </SlReveal>
            ))}
          </ul>
        </div>

        <SlReveal delay={340} className="lg:pt-16">
          <figure className="lg:sticky lg:top-28">
            <div className="sl-photo aspect-4/3 w-full sm:aspect-3/2">
              <img
                src={lumeProducts.url}
                alt="Prodotti e strumenti professionali Studio Lume su piano in marmo scuro"
                width={1536}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover object-[26%_center]"
              />
            </div>
            <figcaption className="sl-label mt-4 opacity-55">
              Strumenti e prodotti selezionati
            </figcaption>
          </figure>
        </SlReveal>
      </div>
    </section>
  );
}

/* ------------------------------- l'esperienza ------------------------------ */

function EsperienzaSection() {
  return (
    <section id="esperienza" className="sl-band">
      <div className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-28">
        <SlReveal delay={80}>
          <div className="sl-photo aspect-4/3 w-full sm:aspect-3/2">
            <img
              src={lumeLavaggio.url}
              alt="Momento del lavaggio nel salone Studio Lume"
              width={1536}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover object-[70%_center] sm:object-center"
            />
          </div>
        </SlReveal>

        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-start lg:gap-20">
          <div>
            <SectionLabel>L&apos;esperienza</SectionLabel>
            <SlReveal as="h2" delay={140} className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              Prenditi
              <br /> il tuo tempo
            </SlReveal>
          </div>
          <div className="lg:pt-4">
            <SlReveal as="p" delay={220} className="sl-body max-w-md">
              Dalla consulenza al momento finale, ogni fase è pensata per farti sentire a tuo agio
              e lasciare spazio alla cura.
            </SlReveal>
            <SlReveal delay={300} className="mt-8">
              <div className="sl-rule w-16" />
            </SlReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- il risultato ------------------------------ */

function RisultatoSection() {
  return (
    <section id="risultato" className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <div>
          <SectionLabel>Il risultato</SectionLabel>
          <SlReveal as="h2" delay={140} className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
            Il tuo stile,
            <br /> portato alla luce.
          </SlReveal>
          <SlReveal as="p" delay={220} className="sl-body mt-6 max-w-sm">
            Forma, movimento e dettagli costruiti intorno a te.
          </SlReveal>
          <SlReveal delay={300} className="mt-8">
            <div className="sl-rule w-16" />
          </SlReveal>
        </div>
        <SlReveal delay={180}>
          <div className="sl-photo aspect-4/3 w-full sm:aspect-3/2">
            <img
              src={lumeStyling.url}
              alt="Styling finale su capelli lunghi nel salone Studio Lume"
              width={1536}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover object-[58%_center]"
            />
          </div>
        </SlReveal>
      </div>
    </section>
  );
}

/* ---------------------------------- page ---------------------------------- */


function StudioLume() {
  return (
    <div className="sl relative overflow-x-clip" id="top">
      <LumeHeader />
      <ReturnControl />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:min-h-[100svh]">
        <div aria-hidden="true" className="sl-hero-veil absolute inset-0" />
        <div className="relative mx-auto grid max-w-[82rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <p className="sl-label sl-enter" style={{ animationDelay: "160ms" }}>
              <span style={{ color: "var(--sl-bronze)" }}>Più di un taglio</span>
            </p>
            <h1
              className="sl-enter mt-6 text-balance text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "300ms" }}
            >
              Un&apos;esperienza
              <br /> su misura
            </h1>
            <p
              className="sl-body sl-enter mt-7 max-w-md"
              style={{ animationDelay: "440ms" }}
            >
              Stile, tecnica e attenzione ai dettagli. Studio Lume è un luogo dove la bellezza
              prende forma, insieme a te.
            </p>
            <div className="sl-enter mt-8" style={{ animationDelay: "540ms" }}>
              <div className="sl-rule w-16" />
            </div>
            <div
              className="sl-enter mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              style={{ animationDelay: "620ms" }}
            >
              <button
                type="button"
                onClick={() => scrollToId("prenota")}
                className="sl-btn sl-btn-solid justify-center"
              >
                Prenota ora <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToId("salone")}
                className="sl-btn sl-btn-outline justify-center"
              >
                Scopri il salone <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              className="sl-photo sl-enter-media aspect-4/5 w-full sm:aspect-16/11 lg:aspect-4/5"
              style={{ animationDelay: "700ms" }}
            >
              <img
                src={lumeHero.url}
                alt="Sessione di styling nel salone Studio Lume"
                width={1664}
                height={936}
                className="h-full w-full object-cover"
              />
            </div>
            <ul
              className="sl-label sl-enter mt-6 flex flex-wrap gap-x-8 gap-y-3 opacity-70"
              style={{ animationDelay: "860ms" }}
            >
              {SERVIZI.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* IL SALONE */}
      <SaloneSection />


      {/* SERVIZI */}
      <ServiziSection />

      {/* L'ESPERIENZA */}
      <EsperienzaSection />

      {/* IL RISULTATO */}
      <RisultatoSection />


      {/* PRIMA / DOPO */}
      <section id="prima-dopo" className="sl-band">
        <div className="mx-auto max-w-[82rem] px-5 pt-20 sm:px-8 sm:pt-28">
          <SectionLabel>Prima / Dopo</SectionLabel>
          <SlReveal as="h2" delay={120} className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
            La trasformazione
            <br /> prende forma
          </SlReveal>
          <SlReveal as="p" delay={200} className="sl-body mt-6 max-w-md">
            Un nuovo equilibrio, costruito intorno a te.
          </SlReveal>
          <SlReveal delay={260} className="mt-8">
            <div className="sl-rule w-16" />
          </SlReveal>
        </div>
        <BeforeAfter />
      </section>


      {/* IL TEAM */}
      <section id="team" className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionLabel>Il team</SectionLabel>
            <SlReveal as="h2" delay={120} className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              Esperienza
              <br /> Passione
              <br /> Persone
            </SlReveal>
            <SlReveal as="p" delay={200} className="sl-body mt-6 max-w-sm">
              Tre visioni, un&apos;unica filosofia: la bellezza autentica.
            </SlReveal>
            <SlReveal delay={280} className="mt-8">
              <button
                type="button"
                onClick={() => scrollToId("prenota")}
                className="sl-btn sl-btn-outline"
              >
                Conosci il team <span aria-hidden="true">→</span>
              </button>
            </SlReveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {TEAM.map((m, i) => (
              <SlReveal key={m.name} delay={i * 90}>
                <Frame label={m.name} className="aspect-3/4 w-full" />
                <p className="sl-label mt-4">{m.name}</p>
                <p className="sl-body mt-1 text-sm opacity-70">{m.role}</p>
              </SlReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRENOTAZIONE */}
      <section id="prenota" className="sl-band">
        <div className="mx-auto grid max-w-[82rem] items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionLabel>Prenota il tuo appuntamento</SectionLabel>
            <SlReveal as="h2" delay={120} className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              Il tuo stile
              <br /> inizia da qui
            </SlReveal>
            <SlReveal as="p" delay={200} className="sl-body mt-6 max-w-md">
              Scegli il professionista, il servizio e l&apos;orario. Ci pensiamo noi al resto.
            </SlReveal>
            <SlReveal delay={280} className="mt-8">
              <span className="sl-btn sl-btn-outline">
                Prenota ora <span aria-hidden="true">→</span>
              </span>
            </SlReveal>
          </div>

          <SlReveal delay={140}>
            <div className="sl-panel">
              <ol className="sl-label flex flex-wrap items-center gap-x-4 gap-y-2 opacity-70">
                {["Professionista", "Servizio", "Data e ora", "Conferma"].map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="sl-step">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-8 grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start">
                <div className="flex gap-4">
                  {TEAM.map((m) => (
                    <div key={m.name} className="text-center">
                      <div className="sl-avatar" aria-hidden="true" />
                      <p className="sl-body mt-2 text-xs">{m.name}</p>
                    </div>
                  ))}
                </div>
                <Frame label="Calendario" className="h-40 w-full" />
              </div>
            </div>
          </SlReveal>
        </div>
      </section>

      {/* CONTATTI */}
      <section id="contatti" className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-28">
        <SectionLabel>Contatti</SectionLabel>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Indirizzo", v: "Via delle Sete 12, Milano" },
            { k: "Telefono", v: "+39 02 0000 0000" },
            { k: "Email", v: "info@studiolume.it" },
            { k: "Orari", v: "Mar — Sab · 9:00 / 19:00" },
          ].map((row, i) => (
            <SlReveal key={row.k} delay={i * 80}>
              <div className="sl-rule mb-5 w-full" />
              <p className="sl-label opacity-60">{row.k}</p>
              <p className="sl-body mt-2">{row.v}</p>
            </SlReveal>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="sl-cta">
        <div className="mx-auto max-w-[82rem] px-5 py-24 text-center sm:px-8 sm:py-32">
          <SlReveal as="h2" className="text-3xl leading-[1.15] sm:text-5xl">
            La bellezza
            <br /> prende forma
            <br /> insieme a te
          </SlReveal>
          <SlReveal delay={160} className="mt-10">
            <button
              type="button"
              onClick={() => scrollToId("prenota")}
              className="sl-btn sl-btn-solid"
            >
              Prenota ora <span aria-hidden="true">→</span>
            </button>
          </SlReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="sl-footer">
        <div className="mx-auto grid max-w-[82rem] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-3 lg:items-center">
          <img
            src={lumeLogo.url}
            alt="Studio Lume Hair Atelier"
            width={1272}
            height={696}
            loading="lazy"
            className="h-14 w-auto object-contain"
          />
          <nav className="sl-label flex flex-wrap gap-x-8 gap-y-3 opacity-70 lg:justify-center">
            <span>Instagram</span>
            <span>TikTok</span>
            <button type="button" onClick={() => scrollToId("contatti")}>
              Contatti
            </button>
          </nav>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <ConceptBy />
            <Link to="/portfolio" className="sl-label opacity-55 hover:opacity-90">
              ← Torna al portfolio BRETÌA
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-[82rem] px-5 pb-12 sm:px-8">
          <div className="sl-rule mb-6" />
          <p className="sl-body text-xs leading-relaxed opacity-55">
            © 2026 Studio Lume Hair Atelier — progetto dimostrativo. Studio Lume è un concept
            fittizio realizzato da BRETÌA Web Studio a scopo illustrativo: nomi, immagini, orari e
            recapiti non si riferiscono ad alcuna attività reale.
          </p>
        </div>
      </footer>
    </div>
  );
}
