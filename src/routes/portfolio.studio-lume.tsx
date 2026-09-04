import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";
import { LUME_FONTS_HREF } from "@/lib/fonts";
import lumeLogo from "@/assets/lume/studio-lume-logo-light.png.asset.json";

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
  { title: "Taglio", caption: "Tecnica e stile, su misura per te." },
  { title: "Colore", caption: "Riflessi che valorizzano la tua unicità." },
  { title: "Styling", caption: "Il tuo stile, ogni giorno." },
  { title: "Trattamenti", caption: "Salute e bellezza per i tuoi capelli." },
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
            className="h-10 w-auto object-contain sm:h-12"
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

        <button
          type="button"
          onClick={() => go("prenota")}
          className="sl-btn sl-btn-outline hidden lg:inline-flex"
        >
          Prenota ora
        </button>

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

/* ---------------------------------- page ---------------------------------- */

function StudioLume() {
  return (
    <div className="sl relative overflow-x-clip" id="top">
      <LumeHeader />
      <ReturnControl />

      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden pt-32 pb-16 sm:pt-36">
        <div aria-hidden="true" className="sl-hero-veil absolute inset-0" />
        <div className="relative mx-auto grid min-h-[calc(100svh-13rem)] max-w-[82rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
          <div>
            <SectionLabel>Più di un taglio</SectionLabel>
            <SlReveal
              as="h1"
              delay={140}
              className="mt-6 text-balance text-[2.75rem] leading-[1.03] sm:text-6xl lg:text-7xl"
            >
              Un&apos;esperienza
              <br /> su misura
            </SlReveal>
            <SlReveal as="p" delay={240} className="sl-body mt-7 max-w-md">
              Stile, tecnica e attenzione ai dettagli. Studio Lume è un luogo dove la bellezza
              prende forma, insieme a te.
            </SlReveal>
            <SlReveal delay={320} className="mt-8">
              <div className="sl-rule w-16" />
            </SlReveal>
            <SlReveal delay={380} className="mt-8">
              <button
                type="button"
                onClick={() => scrollToId("prenota")}
                className="sl-btn sl-btn-outline"
              >
                Prenota ora <span aria-hidden="true">→</span>
              </button>
            </SlReveal>
          </div>

          <div className="relative">
            <SlReveal delay={200}>
              <Frame label="Ritratto hero" className="aspect-4/5 w-full" />
            </SlReveal>
            <ul className="sl-label mt-8 flex flex-wrap gap-x-8 gap-y-3 opacity-70 lg:absolute lg:-right-2 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col lg:gap-4">
              {SERVIZI.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* IL SALONE */}
      <section id="salone" className="sl-band">
        <div className="mx-auto grid max-w-[82rem] items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <SlReveal>
            <Frame label="Vetrina del salone" className="aspect-4/3 w-full" />
          </SlReveal>
          <div>
            <SectionLabel>Il salone</SectionLabel>
            <SlReveal as="h2" delay={120} className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              Un luogo
              <br /> pensato per te
            </SlReveal>
            <SlReveal as="p" delay={200} className="sl-body mt-6 max-w-lg">
              Linee essenziali, atmosfere ricercate e un team di professionisti al tuo servizio.
              Ogni dettaglio è pensato per offrirti un&apos;esperienza unica, dal momento in cui
              varchi la nostra porta.
            </SlReveal>
            <SlReveal delay={280} className="mt-8">
              <button
                type="button"
                onClick={() => scrollToId("servizi")}
                className="sl-btn sl-btn-outline"
              >
                Scopri il salone <span aria-hidden="true">→</span>
              </button>
            </SlReveal>
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section id="servizi" className="mx-auto max-w-[82rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>I nostri servizi</SectionLabel>
            <SlReveal as="h2" delay={120} className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              Bellezza
              <br /> in ogni dettaglio
            </SlReveal>
          </div>
          <SlReveal delay={180} className="flex items-center gap-4">
            <span className="sl-rule w-12" />
            <span className="sl-label opacity-75">Scopri tutti i servizi →</span>
          </SlReveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVIZI.map((s, i) => (
            <SlReveal key={s.title} delay={i * 90} className="sl-card">
              <Frame label={s.title} className="aspect-4/5 w-full" />
              <h3 className="sl-label mt-5">{s.title}</h3>
              <p className="sl-body mt-2 text-sm">{s.caption}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="sl-rule w-10" />
                <span aria-hidden="true" style={{ color: "var(--sl-bronze)" }}>
                  →
                </span>
              </div>
            </SlReveal>
          ))}
        </div>
      </section>

      {/* PRIMA / DOPO */}
      <section id="prima-dopo" className="sl-band">
        <div className="mx-auto grid max-w-[82rem] items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionLabel>Trasformazioni reali</SectionLabel>
            <SlReveal as="h2" delay={120} className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              Stessa persona.
              <br /> Una nuova luce.
            </SlReveal>
            <SlReveal as="p" delay={200} className="sl-body mt-6 max-w-md">
              Scorri per vedere la trasformazione.
            </SlReveal>
            <SlReveal delay={260} className="mt-8">
              <div className="sl-rule w-16" />
            </SlReveal>
          </div>
          <SlReveal delay={140}>
            <div className="relative">
              <Frame label="Prima / Dopo" className="aspect-4/3 w-full" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-6 left-1/2 w-px"
                style={{ backgroundColor: "color-mix(in oklab, #e9dfd1 45%, transparent)" }}
              />
              <div className="sl-label pointer-events-none absolute inset-x-6 bottom-4 flex justify-between opacity-60">
                <span>Prima</span>
                <span>Dopo</span>
              </div>
            </div>
          </SlReveal>
        </div>
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
