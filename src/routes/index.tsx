import { createFileRoute } from "@tanstack/react-router";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { BrandButton } from "@/components/ui-brand/BrandButton";
import { Reveal } from "@/components/ui-brand/Reveal";
import { SectionHeading } from "@/components/ui-brand/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { PortfolioCard } from "@/components/site/PortfolioCard";
import conceptRestaurant from "@/assets/concept-restaurant.jpg";
import conceptAutomotive from "@/assets/concept-automotive.jpg";
import conceptBeauty from "@/assets/concept-beauty.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BRETÌA Web Studio — La professionalità digitale, per tutti" },
      {
        name: "description",
        content:
          "Progettiamo siti web moderni, professionali e accessibili, pensati per dare a ogni attività la presenza online che merita.",
      },
      {
        property: "og:title",
        content: "BRETÌA Web Studio — La professionalità digitale, per tutti",
      },
      {
        property: "og:description",
        content:
          "Siti web moderni e accessibili per piccole e medie attività. Design, funzionalità e cura del dettaglio.",
      },
    ],
  }),
  component: Home,
});

const SERVICES = [
  {
    index: "01",
    title: "SITI WEB",
    description:
      "Siti moderni e responsive progettati intorno all'identità dell'attività.",
  },
  {
    index: "02",
    title: "RESTYLING",
    description:
      "Trasformiamo siti datati in esperienze più moderne, chiare ed efficaci.",
  },
  {
    index: "03",
    title: "DIGITAL EXPERIENCE",
    description:
      "Progettiamo esperienze digitali semplici, intuitive e piacevoli da utilizzare.",
  },
  {
    index: "04",
    title: "PRENOTAZIONI & INTEGRAZIONI",
    description:
      "Colleghiamo il sito agli strumenti digitali più adatti alle esigenze dell'attività.",
  },
];

const PROJECTS = [
  { title: "RESTAURANT", caption: "Identità digitale per la ristorazione.", image: conceptRestaurant },
  { title: "AUTOMOTIVE", caption: "Presentazione veicoli e servizi.", image: conceptAutomotive },
  { title: "BEAUTY", caption: "Prenotazioni e trattamenti.", image: conceptBeauty },
];

const STEPS = [
  { index: "01", title: "ANALIZZIAMO", text: "Capiamo l'attività, gli obiettivi e le persone da raggiungere." },
  { index: "02", title: "PROGETTIAMO", text: "Definiamo struttura, contenuti e direzione visiva." },
  { index: "03", title: "SVILUPPIAMO", text: "Costruiamo un sito veloce, responsive e curato nel dettaglio." },
  { index: "04", title: "LANCIAMO", text: "Pubblichiamo, verifichiamo e accompagniamo l'attività online." },
];

function Home() {
  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-veil)" }}
        />
        <div className="container-brand relative flex min-h-[100svh] flex-col items-center justify-center py-32 text-center">
          <AnimatedLogo />

          <h1 className="anim-wordmark mt-14 max-w-4xl text-balance font-display text-[2.15rem] font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl xl:text-7xl">
            LA PROFESSIONALITÀ
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient-accent">DIGITALE</span>, PER TUTTI.
          </h1>

          <p className="anim-descriptor mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Progettiamo siti web moderni, professionali e accessibili, pensati per dare a ogni
            attività la presenza online che merita.
          </p>

          <div className="anim-descriptor mt-11 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <BrandButton to="/chi-siamo" size="lg" className="w-full sm:w-auto">
              Scopri BRETÌA
            </BrandButton>
            <BrandButton to="/portfolio" variant="secondary" size="lg" className="w-full sm:w-auto">
              Guarda i progetti
            </BrandButton>
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTRODUCTION */}
      <section className="border-t border-border py-24 sm:py-32 lg:py-40">
        <div className="container-brand">
          <Reveal as="p" className="label-eyebrow">
            BRETÌA / WEB STUDIO
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="mt-8 max-w-5xl text-balance text-[1.75rem] font-semibold leading-[1.12] sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
          >
            Essere una piccola attività non significa dover avere una piccola presenza digitale.
          </Reveal>
          <Reveal
            as="p"
            delay={160}
            className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Una presenza online professionale può fare la differenza nel modo in cui un'attività
            viene scoperta, valutata e scelta.
          </Reveal>
        </div>
      </section>

      {/* SECTION 3 — SERVICES */}
      <section className="border-t border-border bg-surface/30 py-24 sm:py-32">
        <div className="container-brand">
          <SectionHeading eyebrow="COSA FACCIAMO" title="Dal primo concept al sito online." />
          <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.index} {...service} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — PORTFOLIO */}
      <section className="border-t border-border py-24 sm:py-32">
        <div className="container-brand">
          <SectionHeading eyebrow="PORTFOLIO" title="Progetti che parlano." />
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <PortfolioCard key={project.title} {...project} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — METHOD */}
      <section className="border-t border-border bg-surface/30 py-24 sm:py-32">
        <div className="container-brand">
          <SectionHeading eyebrow="IL NOSTRO METODO" title="Dal primo messaggio al sito online." />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.index} className="bg-background">
                <Reveal delay={i * 80} className="group h-full">
                  <div className="h-full p-8 transition-colors duration-[var(--transition-base)] hover:bg-surface">
                    <span className="font-display text-xs tracking-[0.3em] text-primary">
                      {step.index}
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold tracking-[0.1em]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 6 — PHILOSOPHY */}
      <section className="border-t border-border py-24 sm:py-32 lg:py-40">
        <div className="container-brand grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal
              as="h2"
              className="text-balance font-display text-3xl font-semibold leading-[1.06] sm:text-5xl lg:text-6xl"
            >
              QUALITÀ SENZA
              <br />
              COSTI INUTILI.
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal
              as="p"
              delay={100}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Una struttura agile e processi produttivi efficienti ci permettono di concentrare le
              nostre risorse su ciò che conta davvero: design, funzionalità e cura del dettaglio.
            </Reveal>
            <Reveal delay={180} className="mt-10">
              <p className="border-l-2 border-primary pl-5 font-display text-lg font-medium leading-snug sm:text-xl">
                Professionalità digitale, alla portata di tutti.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="relative overflow-hidden border-t border-border bg-surface/40 py-28 sm:py-40">
        <BretiaSymbol className="pointer-events-none absolute -right-16 top-1/2 h-72 w-auto -translate-y-1/2 opacity-[0.07] sm:h-[26rem]" />
        <div className="container-brand relative text-center">
          <Reveal as="h2" className="font-display text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            HAI UN PROGETTO?
          </Reveal>
          <Reveal as="p" delay={100} className="mt-6 text-base text-muted-foreground sm:text-lg">
            Raccontaci cosa hai in mente.
          </Reveal>
          <Reveal delay={180} className="mt-11">
            <BrandButton to="/contatti" size="lg">
              Parliamone
            </BrandButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
