import { createFileRoute } from "@tanstack/react-router";
import {
  Camera,
  Clapperboard,
  Clock,
  Crop,
  Globe,
  Images,
  Megaphone,
  LayoutGrid,
  Package,
  Palette,
  PenTool,
  Wallet,
} from "lucide-react";
import { ClosingCta } from "@/components/site/ClosingCta";
import { FocusShift } from "@/components/site/FocusShift";
import { MetricsFilter } from "@/components/site/MetricsFilter";
import { ChannelBridge } from "@/components/site/ChannelBridge";
import { RawMaterialCard, type RawMaterialItem } from "@/components/site/RawMaterialCard";
import { SocialHero } from "@/components/site/SocialHero";
import { BrandButton } from "@/components/ui-brand/BrandButton";
import { SectionHeading } from "@/components/ui-brand/SectionHeading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui-brand/Reveal";
import { pageHead } from "@/lib/seo";

import rawCantinaSrc from "@/assets/osteria/osteria-cantina.jpg";
import rawCucinaSrc from "@/assets/osteria/osteria-cucina.jpg";
import rawDishSrc from "@/assets/osteria/osteria-dish-1.jpg";
import rawHeroSrc from "@/assets/osteria/osteria-hero.jpg";
import rawTavoloSrc from "@/assets/osteria/osteria-prenota.jpg";

export const Route = createFileRoute("/social-media-managing")({
  head: () =>
    pageHead({
      path: "/social-media-managing",
      title: "Social Media Managing — BRETÌA Web Studio",
      description:
        "Strategia, contenuti, gestione e analisi: BRETÌA costruisce la presenza social della tua attività senza che tu debba diventare un creator.",
      ogTitle: "Social Media Managing — BRETÌA Web Studio",
      ogDescription:
        "La tua presenza digitale, fatta bene. Gestiamo i social della tua attività con strategia, contenuti e continuità.",
    }),
  component: SocialMediaManaging,
});

const PILLARS = [
  {
    title: "Strategia",
    text: "Definiamo una direzione chiara per la presenza digitale dell'attività.",
  },
  {
    title: "Contenuti",
    text: "Post, Stories, Reel e grafiche costruiti intorno all'identità del brand.",
  },
  {
    title: "Gestione",
    text: "Organizziamo, programmiamo e gestiamo la pubblicazione dei contenuti.",
  },
  {
    title: "Analisi",
    text: "Osserviamo ciò che funziona e utilizziamo i risultati per migliorare il lavoro.",
  },
];

const RAW_MATERIAL: RawMaterialItem[] = [
  {
    kind: "reel",
    tag: "REEL 9:16",
    title: "La preparazione di una portata.",
    value: "Il formato che ti porta davanti a chi ancora non ti segue.",
    image: rawCucinaSrc,
  },
  {
    kind: "snapshot",
    tag: "SNAPSHOT",
    title: "Un piatto appena servito.",
    value: "Un post pronto in pochi minuti, senza fermare il servizio.",
    image: rawDishSrc,
  },
  {
    kind: "dettaglio",
    tag: "DETTAGLIO",
    title: "Un dettaglio del locale.",
    value: "Quello che i clienti notano e si ricordano dopo.",
    image: rawCantinaSrc,
  },
  {
    kind: "carosello",
    tag: "CAROSELLO",
    title: "Un tavolo apparecchiato.",
    value: "Più scatti, una storia sola: le persone restano sul post.",
    image: rawTavoloSrc,
  },
  {
    kind: "stories",
    tag: "STORIES",
    title: "Un momento della giornata.",
    value: "Presenza quotidiana, anche nei giorni senza novità.",
    image: rawHeroSrc,
  },
];

/** I tre passaggi che portano dal materiale grezzo al contenuto. */
const METHOD = [
  { label: "ANALISI", text: "Guardiamo cosa il locale ha già e cosa racconta meglio." },
  { label: "SELEZIONE", text: "Teniamo solo ciò che regge la pubblicazione." },
  { label: "FORMAT", text: "Ogni scatto trova il formato in cui rende di più." },
];

const FLOW = ["ATTIVITÀ", "CONTENUTO", "PUBBLICAZIONE", "PRESENZA DIGITALE"];

/* I due canali del cross-sell, nell'ordine del percorso: prima si viene
   trovati, poi si viene scelti. */
const CHANNELS = [
  {
    icon: Megaphone,
    title: "I social intercettano",
    text: "Portano l'attività davanti a chi non la conosce ancora, ogni settimana, senza aspettare che ti cerchi.",
  },
  {
    icon: Globe,
    title: "Il sito converte",
    text: "Menu, prenotazioni, orari e contatti: è dove la curiosità nata sui social diventa una scelta concreta.",
  },
];

/* Due percorsi complementari: chi ha un archivio da mettere a sistema e chi
   parte da zero. Il secondo è la produzione a pagamento, quindi è la card
   accentata. */
const PRODUCTION = [
  {
    icon: Images,
    badge: "VALORIZZAZIONE",
    accent: false,
    title: "Ottimizzazione asset esistenti",
    tagline: "Per chi ha già un archivio di foto e video da mettere a sistema.",
    points: [
      { icon: Palette, label: "Selezione e color grading del materiale grezzo" },
      { icon: Crop, label: "Adattamento formati: Reels 9:16, caroselli, grafiche feed" },
      { icon: LayoutGrid, label: "Creazione di una griglia e di un'identità coerente" },
      { icon: Wallet, label: "Zero sprechi: nessun costo extra di produzione" },
    ],
  },
  {
    icon: Camera,
    badge: "NUOVA PRODUZIONE",
    accent: true,
    title: "Produzione on-site & shooting",
    tagline: "Per chi parte da zero o ha bisogno di un salto di qualità visiva.",
    points: [
      { icon: Clock, label: "Mezza giornata o giornata intera di shooting sul posto" },
      { icon: Clapperboard, label: "Attrezzatura cinema, audio e luci professionali" },
      { icon: Package, label: "Pacchetto mensile pronto: 8-12 clip brevi + foto still life" },
      { icon: PenTool, label: "Direzione creativa e storyboard prima delle riprese" },
    ],
  },
];

function SocialMediaManaging() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-veil)" }}
        />
        <div className="container-brand relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal as="p" className="label-eyebrow">
              SOCIAL MEDIA MANAGING
            </Reveal>
            <Reveal
              as="h1"
              delay={120}
              className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
            >
              La tua presenza digitale.
              <br />
              Fatta bene.
            </Reveal>
            <Reveal
              as="p"
              delay={260}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Gestiamo i tuoi social trasformando ciò che rende unica la tua attività in contenuti
              capaci di raccontarla, valorizzarla e farla ricordare.
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <SocialHero />
          </div>
        </div>
      </section>

      {/* FILOSOFIA */}
      <section className="border-b border-border py-24 sm:py-32">
        <div className="container-brand grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="IL PUNTO DI PARTENZA"
              title={
                <>
                  Non devi diventare
                  <br />
                  un creator.
                  <br />
                  Deve diventare protagonista
                  <br />
                  la tua attività.
                </>
              }
              description={
                <>
                  Non è necessario mettersi davanti alla fotocamera. Raccontiamo ciò che rende
                  riconoscibile la tua attività: il locale, i prodotti, i dettagli, l'atmosfera e
                  tutto ciò che la rende diversa.
                </>
              }
            />
            <Reveal
              as="p"
              delay={200}
              className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground"
            >
              Costruiamo una presenza social attorno all'attività reale, non attorno alla persona:
              titolare e collaboratori non devono comparire di continuo per avere una comunicazione
              costante e riconoscibile.
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <FocusShift />
          </div>
        </div>
      </section>

      {/* COSA COMPRENDE */}
      <section className="border-b border-border bg-surface/30 py-24 sm:py-32">
        <div className="container-brand">
          <SectionHeading eyebrow="COSA COMPRENDE" title="Il servizio, in quattro parti." />
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90} className="h-full">
                <SpotlightCard className="h-full p-7 sm:p-9">
                  <h3 className="font-display text-xl font-semibold tracking-[0.04em] sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                    {pillar.text}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENUTI GIÀ PRESENTI */}
      <section className="border-b border-border py-20 sm:py-24">
        <div className="container-brand">
          <SectionHeading
            eyebrow="MATERIA PRIMA"
            title={
              <>
                Il tuo locale
                <br />è già pieno di contenuti.
              </>
            }
          />
          {/* Sei riquadri di pari peso: il primo dice il lavoro, gli altri
              cinque i formati. Resta una lista — è l'elenco di ciò che il
              locale ha già, non una griglia di link. */}
          <ul className="mt-12 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal as="li" className="h-full">
              <SpotlightCard className="h-full justify-center p-6 sm:p-7">
                <span className="inline-flex w-fit items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-display text-[0.6875rem] tracking-[0.18em] text-accent">
                  IL LAVORO
                </span>
                <p className="mt-5 font-display text-xl font-semibold leading-[1.2] tracking-[0.01em] sm:text-2xl">
                  Non dobbiamo inventare
                  <br />
                  un&apos;identità.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Dobbiamo saperla{" "}
                  <span className="text-accent">osservare, valorizzare e raccontare</span>.
                </p>
                <ul className="mt-6 flex list-none flex-col gap-3 border-t border-border pt-5">
                  {METHOD.map((step) => (
                    <li key={step.label} className="flex items-baseline gap-3">
                      <span className="font-display text-xs tracking-[0.16em] text-accent">
                        {step.label}
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {step.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>

            {RAW_MATERIAL.map((item, i) => (
              <Reveal as="li" key={item.title} delay={80 + i * 70} className="h-full">
                <RawMaterialCard {...item} />
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200} className="mt-12">
            {/* Stepper: pillole collegate da un filo continuo. È una sequenza,
                non quattro etichette sciolte — `ol` la annuncia come tale a
                chi non la vede. */}
            <ol className="flex list-none flex-col gap-0 border-t border-border pt-10 sm:flex-row sm:items-center">
              {FLOW.map((step, i) => {
                const last = i === FLOW.length - 1;
                return (
                  <li
                    key={step}
                    className="flex shrink-0 items-center sm:shrink sm:[&:not(:last-child)]:flex-1"
                  >
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center rounded-full border px-4 py-2 font-display text-xs tracking-[0.18em] transition-colors duration-[var(--transition-base)]",
                        last
                          ? "border-accent bg-accent/10 text-foreground"
                          : "border-border bg-surface-2 text-foreground/80",
                      )}
                    >
                      {step}
                    </span>
                    {last ? null : (
                      // Il filo è verticale finché le pillole sono impilate:
                      // una linea orizzontale contraddirebbe il layout.
                      <span
                        aria-hidden="true"
                        className="ml-5 h-6 w-px bg-border-strong sm:ml-3 sm:h-px sm:w-full sm:min-w-4 sm:flex-1"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* NUMERI */}
      <section className="border-b border-border bg-surface/30 py-24 sm:py-32 lg:py-40">
        <div className="container-brand grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal as="p" className="label-eyebrow">
              RISULTATI
            </Reveal>
            <Reveal
              as="h2"
              delay={80}
              className="mt-6 max-w-4xl text-balance font-display text-3xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
            >
              Non inseguiamo
              <br />
              numeri vuoti.
            </Reveal>
            <Reveal
              as="p"
              delay={140}
              className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Costruiamo una presenza digitale riconoscibile, coerente e utile all'attività.
              Follower, like e visualizzazioni sono indicatori. Non sono il punto di partenza.
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <MetricsFilter />
          </div>
        </div>
      </section>

      {/* PRODUZIONE CONTENUTI */}
      <section className="border-b border-border py-24 sm:py-32">
        <div className="container-brand">
          <SectionHeading
            eyebrow="FLESSIBILITÀ OPERATIVA"
            title="Due modi di lavorare, lo stesso standard visivo."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {PRODUCTION.map((track, i) => (
              <Reveal key={track.title} delay={i * 90} className="h-full">
                <SpotlightCard
                  className={cn(
                    "group h-full p-6 sm:p-8",
                    track.accent
                      ? "border-primary/20 hover:border-primary/60"
                      : "hover:border-border-strong",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-brand transition-colors duration-[var(--transition-base)]",
                        track.accent
                          ? "border-primary/30 bg-primary/10 group-hover:border-primary/60"
                          : "border-border bg-surface-2 group-hover:border-border-strong",
                      )}
                    >
                      <track.icon aria-hidden="true" size={18} strokeWidth={1.5} />
                    </span>
                    <span
                      className={cn(
                        "label-eyebrow rounded-full border px-3 py-1",
                        track.accent
                          ? "border-primary/30 bg-primary/10 text-brand"
                          : "border-border",
                      )}
                    >
                      {track.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-[0.04em] sm:text-xl">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {track.tagline}
                  </p>
                  <ul className="mt-5 flex list-none flex-col gap-3 border-t border-border pt-5">
                    {track.points.map((point) => (
                      <li key={point.label} className="flex items-start gap-3">
                        <point.icon
                          aria-hidden="true"
                          size={16}
                          strokeWidth={1.5}
                          className="mt-0.5 shrink-0 text-brand"
                        />
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {point.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WEB + SOCIAL — cross-sell */}
      <section className="bg-surface/30 py-24 sm:py-32">
        <div className="container-brand grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="WEB E SOCIAL"
              title={
                <>
                  I social raccontano.
                  <br />
                  Il sito approfondisce.
                </>
              }
              description="Due strumenti con due compiti diversi: uno intercetta chi non ti conosce, l'altro trasforma la curiosità in una scelta."
            />

            <ul className="mt-10 flex list-none flex-col gap-4">
              {CHANNELS.map((channel, i) => (
                <Reveal as="li" key={channel.title} delay={120 + i * 90}>
                  <div className="flex items-start gap-4 rounded-2xl border border-border p-5 transition-colors duration-[var(--transition-base)] hover:border-primary/40">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-brand">
                      <channel.icon aria-hidden="true" size={18} strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold tracking-[0.04em] sm:text-lg">
                        {channel.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {channel.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={320} className="mt-8">
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Il Social Media Managing resta un servizio autonomo: non richiede un sito realizzato
                da BRETÌA. Se il sito c'è, o arriverà più avanti, i due lavori si sostengono a
                vicenda.
              </p>
              <BrandButton to="/servizi" variant="secondary" className="mt-7">
                Scopri i servizi web
              </BrandButton>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <ChannelBridge />
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="HAI QUALCOSA DA RACCONTARE?"
        title="Dicci cosa hai in mente."
        ctaLabel="Parliamone"
        to="/contatti"
      />
    </>
  );
}
