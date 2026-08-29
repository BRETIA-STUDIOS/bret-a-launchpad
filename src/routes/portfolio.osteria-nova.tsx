import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { cn } from "@/lib/utils";
import logoLight from "@/assets/osteria/logo-light.png.asset.json";
import heroImg from "@/assets/osteria/hero.jpg.asset.json";
import dish1 from "@/assets/osteria/dish-1.jpg.asset.json";
import dish2 from "@/assets/osteria/dish-2.jpg.asset.json";
import dish3 from "@/assets/osteria/dish-3.jpg.asset.json";
import dish4 from "@/assets/osteria/dish-4.jpg.asset.json";
import cucinaImg from "@/assets/osteria/cucina.jpg.asset.json";
import cantinaImg from "@/assets/osteria/cantina.jpg.asset.json";
import prenotaImg from "@/assets/osteria/prenota.jpg.asset.json";

export const Route = createFileRoute("/portfolio/osteria-nova")({
  head: () => ({
    meta: [
      { title: "Osteria Nòva — Concept BRETÌA" },
      {
        name: "description",
        content:
          "Concept dimostrativo di un ristorante italiano contemporaneo: menu, cucina, cantina e prenotazione. Progetto realizzato da BRETÌA Web Studio.",
      },
      { property: "og:title", content: "Osteria Nòva — Concept BRETÌA" },
      {
        property: "og:description",
        content:
          "Un'esperienza digitale costruita attorno all'atmosfera, alla cucina e all'identità di un'osteria italiana contemporanea.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OsteriaNova,
});

/* ---------------------------------- data --------------------------------- */

const NAV = [
  { id: "menu", label: "Menu" },
  { id: "cucina", label: "La Cucina" },
  { id: "cantina", label: "Cantina" },
  { id: "prenota", label: "Prenota" },
];

const MENU = [
  {
    course: "Antipasto",
    name: "Polpo arrosto",
    description: "Crema di ceci, olio al prezzemolo, limone dei Monti Lattari.",
    price: "18",
    image: dish2.url,
  },
  {
    course: "Primo",
    name: "Tonnarelli cacio e pepe",
    description: "Pasta tirata a mano, pecorino romano DOP, pepe di Sarawak.",
    price: "16",
    image: dish1.url,
  },
  {
    course: "Secondo",
    name: "Petto d'anatra all'arancia",
    description: "Riduzione agli agrumi, cavolo rosso brasato, timo fresco.",
    price: "26",
    image: dish3.url,
  },
  {
    course: "Dolce",
    name: "Tiramisù dell'Osteria",
    description: "Mascarpone montato a mano, caffè in infusione, cacao amaro.",
    price: "9",
    image: dish4.url,
  },
];

const CANTINA_NOTES = [
  { label: "Etichette", value: "Oltre 120 selezioni" },
  { label: "Territori", value: "Piemonte · Toscana · Etna" },
  { label: "Al calice", value: "12 vini in rotazione" },
];

/* -------------------------------- primitives ------------------------------ */

function OnReveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: "opacity, transform",
        transitionDuration: "900ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(18px)",
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ConceptBy({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      style={{ color: tone === "light" ? "var(--on-ivory)" : "var(--on-black)" }}
    >
      <span className="text-[0.5625rem] uppercase tracking-[0.28em] opacity-70">A concept by</span>
      <BretiaSymbol variant={tone === "light" ? "white" : "color"} className="h-3.5 w-auto opacity-80" />
      <span className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] opacity-90">BRETÌA</span>
    </span>
  );
}

/* --------------------------------- header --------------------------------- */

function OsteriaHeader() {
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
        backgroundColor: scrolled || open ? "color-mix(in oklab, #10251f 92%, transparent)" : "transparent",
        backdropFilter: scrolled || open ? "blur(10px)" : undefined,
        borderBottom:
          scrolled || open ? "1px solid color-mix(in oklab, #f1e8d5 14%, transparent)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto grid max-w-[80rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:py-5">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="min-w-0"
          aria-label="Osteria Nòva"
        >
          <img
            src={logoLight.url}
            alt="Osteria Nòva"
            width={300}
            height={200}
            className="h-9 w-auto object-contain sm:h-11"
          />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="on-label opacity-75 transition-opacity duration-300 hover:opacity-100"
            >
              {item.label}
            </button>
          ))}
          <Link
            to="/portfolio"
            className="on-label opacity-45 transition-opacity duration-300 hover:opacity-90"
          >
            ← Portfolio
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 shrink-0 items-center justify-center lg:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className="absolute left-0 block h-px w-6 transition-transform duration-300"
              style={{
                backgroundColor: "var(--on-ivory)",
                top: open ? "6px" : "0px",
                transform: open ? "rotate(45deg)" : "none",
              }}
            />
            <span
              className="absolute left-0 block h-px w-6 transition-transform duration-300"
              style={{
                backgroundColor: "var(--on-ivory)",
                top: open ? "6px" : "12px",
                transform: open ? "rotate(-45deg)" : "none",
              }}
            />
          </span>
        </button>
      </div>

      <div
        className="overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden"
        style={{ maxHeight: open ? "22rem" : 0, opacity: open ? 1 : 0 }}
      >
        <nav className="flex flex-col gap-1 px-5 pb-6 sm:px-8">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="on-serif border-b py-3.5 text-left text-2xl"
              style={{ borderColor: "color-mix(in oklab, #f1e8d5 12%, transparent)" }}
            >
              {item.label}
            </button>
          ))}
          <Link to="/portfolio" className="on-label py-4 opacity-55">
            ← Torna al portfolio
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
        className={cn("on-label rounded-full px-4 py-2.5", visible && "pointer-events-auto")}
        style={{
          backgroundColor: "color-mix(in oklab, #11100e 78%, transparent)",
          border: "1px solid color-mix(in oklab, #f1e8d5 22%, transparent)",
          color: "var(--on-ivory)",
          backdropFilter: "blur(8px)",
        }}
      >
        ← Torna al portfolio
      </Link>
    </div>
  );
}

/* ------------------------------- reservation ------------------------------ */

function ReservationForm() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState({
    nome: "",
    data: "",
    orario: "",
    persone: "2",
    note: "",
  });

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!values.nome.trim() || !values.data || !values.orario) {
      setError("Compila nome, data e orario per completare la richiesta.");
      return;
    }
    setError(null);
    setDone(true);
  };

  if (done) {
    return (
      <div
        className="flex flex-col items-start gap-4 p-8 sm:p-10"
        style={{
          border: "1px solid color-mix(in oklab, #f1e8d5 22%, transparent)",
          backgroundColor: "color-mix(in oklab, #11100e 40%, transparent)",
        }}
      >
        <span className="on-label" style={{ color: "var(--on-red)" }}>
          Richiesta ricevuta
        </span>
        <h3 className="text-3xl sm:text-4xl">Grazie, {values.nome.split(" ")[0]}.</h3>
        <p className="max-w-md text-sm leading-relaxed opacity-70">
          Abbiamo preso nota della tua richiesta per il {values.data} alle {values.orario} — {values.persone}{" "}
          {values.persone === "1" ? "persona" : "persone"}. Ti confermeremo il tavolo a breve.
        </p>
        <button type="button" className="on-btn on-btn-ghost mt-2" onClick={() => setDone(false)}>
          Nuova richiesta
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 p-6 sm:p-10"
      style={{
        border: "1px solid color-mix(in oklab, #f1e8d5 18%, transparent)",
        backgroundColor: "color-mix(in oklab, #11100e 40%, transparent)",
      }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="on-nome" className="on-label opacity-70">
          Nome e Cognome
        </label>
        <input
          id="on-nome"
          value={values.nome}
          onChange={set("nome")}
          placeholder="Il tuo nome"
          className="min-h-12 px-4 py-3 text-base"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="on-data" className="on-label opacity-70">
            Data
          </label>
          <input
            id="on-data"
            type="date"
            value={values.data}
            onChange={set("data")}
            className="min-h-12 w-full px-4 py-3 text-base"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="on-orario" className="on-label opacity-70">
            Orario
          </label>
          <input
            id="on-orario"
            type="time"
            value={values.orario}
            onChange={set("orario")}
            className="min-h-12 w-full px-4 py-3 text-base"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="on-persone" className="on-label opacity-70">
          Numero di persone
        </label>
        <select
          id="on-persone"
          value={values.persone}
          onChange={set("persone")}
          className="min-h-12 w-full px-4 py-3 text-base"
        >
          {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => (
            <option key={n} value={n} style={{ color: "#11100e" }}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="on-note" className="on-label opacity-70">
          Richieste particolari
        </label>
        <textarea
          id="on-note"
          rows={3}
          value={values.note}
          onChange={set("note")}
          placeholder="Allergie, occasioni speciali, preferenze di sala…"
          className="w-full resize-none px-4 py-3 text-base"
        />
      </div>

      {error ? (
        <p className="text-sm" style={{ color: "var(--on-red)" }} role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="on-btn on-btn-primary mt-1 w-full sm:w-auto sm:self-start">
        Prenota ora
      </button>
    </form>
  );
}

/* ---------------------------------- page ---------------------------------- */

function OsteriaNova() {
  return (
    <div className="osteria relative overflow-x-clip" id="top">
      <OsteriaHeader />
      <ReturnControl />

      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0">
          <img
            src={heroImg.url}
            alt="Sala dell'Osteria Nòva illuminata a candela"
            width={1600}
            height={1200}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(16,37,31,0.82) 0%, rgba(16,37,31,0.34) 40%, rgba(16,37,31,0.94) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100svh-11rem)] max-w-[80rem] flex-col items-center justify-center px-5 text-center sm:px-8">
          <OnReveal as="p" className="on-label" delay={80}>
            <span style={{ color: "var(--on-red)" }}>Cucina italiana contemporanea</span>
          </OnReveal>

          <OnReveal
            as="h1"
            delay={200}
            className="mt-7 max-w-4xl text-balance text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Tradizione che si rinnova,
            <br className="hidden sm:block" /> ogni giorno.
          </OnReveal>

          <OnReveal
            as="p"
            delay={330}
            className="mt-7 max-w-xl text-base leading-relaxed opacity-75 sm:text-lg"
          >
            Materie prime scelte, ricette di famiglia e una mano contemporanea. Nel cuore della città,
            dal 1974.
          </OnReveal>

          <OnReveal delay={450} className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button
              type="button"
              className="on-btn on-btn-primary w-full sm:w-auto"
              onClick={() => scrollToId("menu")}
            >
              Scopri il menu
            </button>
            <button
              type="button"
              className="on-btn on-btn-ghost w-full sm:w-auto"
              onClick={() => scrollToId("prenota")}
            >
              Prenota ora
            </button>
          </OnReveal>
        </div>

        <div className="relative mx-auto mt-10 flex max-w-[80rem] justify-center px-5 sm:px-8">
          <ConceptBy />
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="scroll-mt-20 py-20 sm:py-28" style={{ backgroundColor: "var(--on-green-2)" }}>
        <div className="mx-auto max-w-[74rem] px-5 sm:px-8">
          <OnReveal className="flex flex-col items-center text-center">
            <p className="on-label" style={{ color: "var(--on-red)" }}>
              Il menu
            </p>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Pochi piatti, scelti ogni mattina.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed opacity-70 sm:text-base">
              La carta cambia con le stagioni e con il mercato. Questi sono i piatti che ci
              rappresentano tutto l'anno.
            </p>
          </OnReveal>

          <div className="mt-16 flex flex-col gap-14 sm:gap-20">
            {MENU.map((dish, i) => (
              <OnReveal
                key={dish.name}
                className={cn(
                  "grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
                  i % 2 === 1 && "lg:[&>figure]:order-2",
                )}
              >
                <figure className="relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    width={900}
                    height={1100}
                    loading="lazy"
                    className="aspect-4/3 w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04] lg:aspect-4/5"
                  />
                </figure>

                <div className="min-w-0">
                  <p className="on-label" style={{ color: "var(--on-red)" }}>
                    {dish.course}
                  </p>
                  <div className="mt-5 flex items-end justify-between gap-6">
                    <h3 className="min-w-0 text-3xl leading-tight sm:text-4xl lg:text-5xl">{dish.name}</h3>
                    <span className="on-serif shrink-0 text-2xl sm:text-3xl" style={{ color: "var(--on-red)" }}>
                      € {dish.price}
                    </span>
                  </div>
                  <div className="on-rule my-6" />
                  <p className="max-w-md text-sm leading-relaxed opacity-70 sm:text-base">
                    {dish.description}
                  </p>
                </div>
              </OnReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LA NOSTRA CUCINA */}
      <section id="cucina" className="scroll-mt-20 py-20 sm:py-28" style={{ backgroundColor: "var(--on-white)" }}>
        <div className="mx-auto grid max-w-[74rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <OnReveal className="lg:col-span-6">
            <img
              src={cucinaImg.url}
              alt="Lo chef dell'Osteria Nòva impiatta in cucina"
              width={1600}
              height={1100}
              loading="lazy"
              className="aspect-4/3 w-full object-cover"
            />
          </OnReveal>

          <div className="min-w-0 lg:col-span-6" style={{ color: "var(--on-brown)" }}>
            <OnReveal as="p" className="on-label" delay={60}>
              <span style={{ color: "var(--on-brick)" }}>La nostra cucina</span>
            </OnReveal>
            <OnReveal
              as="h2"
              delay={140}
              className="mt-6 text-balance text-4xl leading-[1.08] sm:text-5xl"
              // eslint-disable-next-line react/no-unknown-property
            >
              <span style={{ color: "var(--on-black)" }}>Il rispetto della materia prima.</span>
            </OnReveal>
            <OnReveal as="p" delay={220} className="mt-7 max-w-md text-sm leading-relaxed sm:text-base">
              Lavoriamo con piccoli produttori del territorio: pasta tirata a mano ogni mattina, pesce
              del giorno, verdure di stagione. Nulla di più, nulla di superfluo.
            </OnReveal>
            <OnReveal as="p" delay={300} className="mt-5 max-w-md text-sm leading-relaxed sm:text-base">
              La tradizione resta la nostra grammatica; l'interpretazione contemporanea è solo il modo
              in cui la raccontiamo oggi.
            </OnReveal>
            <OnReveal delay={380} className="mt-10">
              <div className="on-rule" style={{ backgroundColor: "rgba(90,56,40,0.25)" }} />
              <p className="on-serif mt-6 text-2xl leading-snug sm:text-3xl" style={{ color: "var(--on-black)" }}>
                «Cucinare è ricordare, e poi decidere cosa vale la pena cambiare.»
              </p>
              <p className="on-label mt-4 opacity-60">Chef · Osteria Nòva</p>
            </OnReveal>
          </div>
        </div>
      </section>

      {/* CANTINA */}
      <section
        id="cantina"
        className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
        style={{ backgroundColor: "var(--on-green)" }}
      >
        <div className="mx-auto grid max-w-[74rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <OnReveal as="p" className="on-label">
              <span style={{ color: "var(--on-red)" }}>Cantina</span>
            </OnReveal>
            <OnReveal as="h2" delay={120} className="mt-6 text-balance text-4xl leading-[1.08] sm:text-5xl">
              Vini selezionati, storie da condividere.
            </OnReveal>
            <OnReveal as="p" delay={200} className="mt-7 max-w-md text-sm leading-relaxed opacity-75 sm:text-base">
              Una cantina costruita nel tempo, tra cantine storiche e piccoli vignaioli che lavorano
              poche bottiglie all'anno. Ogni etichetta viene scelta assaggiando, mai da un catalogo.
            </OnReveal>

            <OnReveal delay={280} className="mt-10 flex flex-col gap-0">
              {CANTINA_NOTES.map((note) => (
                <div key={note.label} className="flex items-center justify-between gap-6 py-4">
                  <span className="on-label opacity-60">{note.label}</span>
                  <span className="on-serif text-lg sm:text-xl">{note.value}</span>
                </div>
              ))}
              <div className="on-rule" />
            </OnReveal>

            <OnReveal delay={360} className="mt-10">
              <button
                type="button"
                className="on-btn on-btn-ghost w-full sm:w-auto"
                onClick={() => scrollToId("prenota")}
              >
                Scopri la nostra cantina
              </button>
            </OnReveal>
          </div>

          <OnReveal delay={120} className="lg:col-span-7">
            <img
              src={cantinaImg.url}
              alt="Bottiglie e calici nella cantina dell'Osteria Nòva"
              width={1600}
              height={1200}
              loading="lazy"
              className="aspect-4/3 w-full object-cover"
            />
          </OnReveal>
        </div>
      </section>

      {/* PRENOTAZIONE */}
      <section id="prenota" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0">
          <img
            src={prenotaImg.url}
            alt=""
            aria-hidden="true"
            width={1600}
            height={1400}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(16,37,31,0.94) 0%, rgba(17,16,14,0.86) 60%, rgba(16,37,31,0.96) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-[74rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <OnReveal as="p" className="on-label">
              <span style={{ color: "var(--on-red)" }}>Prenotazione</span>
            </OnReveal>
            <OnReveal as="h2" delay={120} className="mt-6 text-balance text-4xl leading-[1.08] sm:text-5xl">
              Il tuo tavolo ti aspetta.
            </OnReveal>
            <OnReveal as="p" delay={200} className="mt-7 max-w-md text-sm leading-relaxed opacity-75 sm:text-base">
              Accogliamo un numero limitato di coperti ogni sera. Scrivici data e orario: ti
              confermeremo il tavolo il prima possibile.
            </OnReveal>
            <OnReveal delay={280} className="mt-10 flex flex-col gap-2 text-sm opacity-70">
              <span>Martedì – Domenica · 12:30 – 14:30 / 19:00 – 23:00</span>
              <span>Lunedì chiuso</span>
            </OnReveal>
          </div>

          <OnReveal delay={140} className="min-w-0 lg:col-span-7">
            <ReservationForm />
          </OnReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "var(--on-black)" }}>
        <div className="mx-auto max-w-[74rem] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <img
                src={logoLight.url}
                alt="Osteria Nòva"
                width={300}
                height={200}
                loading="lazy"
                className="h-14 w-auto object-contain"
              />
              <p className="mt-6 max-w-xs text-sm leading-relaxed opacity-60">
                Cucina italiana contemporanea, materie prime del territorio e una cantina scelta
                bottiglia per bottiglia.
              </p>
            </div>

            <div className="lg:col-span-3">
              <p className="on-label opacity-60">Dove siamo</p>
              <p className="mt-5 text-sm leading-relaxed opacity-80">
                Via dell'Osteria, 12
                <br />
                00100 — Città
                <br />
                Italia
              </p>
            </div>

            <div className="lg:col-span-2">
              <p className="on-label opacity-60">Orari</p>
              <p className="mt-5 text-sm leading-relaxed opacity-80">
                Mar – Dom
                <br />
                12:30 – 14:30
                <br />
                19:00 – 23:00
                <br />
                Lunedì chiuso
              </p>
            </div>

            <div className="lg:col-span-2">
              <p className="on-label opacity-60">Contatti</p>
              <p className="mt-5 text-sm leading-relaxed opacity-80">
                +39 000 000 0000
                <br />
                ciao@osterianova.it
              </p>
              <div className="mt-5 flex flex-col gap-1.5 text-sm opacity-80">
                <a href="#top" className="transition-opacity hover:opacity-100">
                  Instagram
                </a>
                <a href="#top" className="transition-opacity hover:opacity-100">
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="on-rule mt-14" />

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs opacity-50">© {new Date().getFullYear()} Osteria Nòva</p>
            <ConceptBy />
          </div>

          <p className="mt-14 max-w-3xl text-[0.6875rem] leading-relaxed opacity-35">
            <span className="uppercase tracking-[0.22em]">Concept dimostrativo</span>
            <br />
            Osteria Nòva è un progetto concept realizzato a fini dimostrativi da BRETÌA. Il marchio, il
            nome, i contenuti e gli elementi visivi presenti in questa demo sono utilizzati
            esclusivamente a scopo esemplificativo. BRETÌA non è affiliata, associata o incaricata
            dall'attività eventualmente rappresentata e non si assume responsabilità per eventuali
            informazioni, servizi o contenuti riferibili a realtà esistenti.
          </p>
        </div>
      </footer>
    </div>
  );
}
