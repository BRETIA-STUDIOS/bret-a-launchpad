import { createFileRoute } from "@tanstack/react-router";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { BrandButton } from "@/components/ui-brand/BrandButton";
import { Reveal } from "@/components/ui-brand/Reveal";
import { SectionHeading } from "@/components/ui-brand/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { MethodFlow } from "@/components/site/MethodFlow";
import { ProjectShowcase } from "@/components/site/ProjectShowcase";


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
    title: "CREAZIONE DI SITI WEB",
    description:
      "Progettiamo e sviluppiamo siti web da zero, costruiti intorno alle esigenze della tua attività.",
  },
  {
    index: "02",
    title: "RESTYLING E RIVISITAZIONE",
    description:
      "Trasformiamo siti esistenti in esperienze più moderne, intuitive e piacevoli da utilizzare.",
  },
  {
    index: "03",
    title: "MANUTENZIONE E ASSISTENZA",
    description:
      "Continuiamo a prenderci cura del sito anche dopo la pubblicazione, con assistenza e manutenzione su richiesta.",
  },
  {
    index: "04",
    title: "REBRANDING",
    description:
      "Rinnoviamo l'identità di un'attività, dal logo alla presenza digitale, senza cancellarne la storia.",
  },
];

const PRINCIPLES = [
  {
    title: "STRUTTURA AGILE",
    text: "Nessuna sovrastruttura da agenzia: parli direttamente con chi progetta e sviluppa il tuo sito.",
  },
  {
    title: "PROCESSI EFFICIENTI",
    text: "Metodo e strumenti collaudati riducono i tempi e i passaggi inutili, non la qualità.",
  },
  {
    title: "CURA DEL DETTAGLIO",
    text: "Design, funzionalità e rifinitura restano al centro di ogni progetto, sempre.",
  },
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
      <section className="overflow-hidden border-t border-border py-24 sm:py-32">
        <div className="container-brand">
          <SectionHeading
            eyebrow="PORTFOLIO"
            title="Progetti che prendono forma."
            description="Scopri alcuni dei concept e delle esperienze digitali progettate da BRETÌA."
          />
        </div>
        <Reveal className="mt-14">
          <ProjectShowcase compact />
        </Reveal>
        <div className="container-brand mt-12">
          <Reveal>
            <BrandButton to="/portfolio" variant="secondary">
              VEDI IL PORTFOLIO
            </BrandButton>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5 — METHOD */}
      <section className="border-t border-border bg-surface/30 py-24 sm:py-32">
        <div className="container-brand">
          <SectionHeading eyebrow="IL NOSTRO METODO" title="Dal primo messaggio al sito online." />
          <MethodFlow className="mt-16" />
        </div>
      </section>

      {/* SECTION 6 — PHILOSOPHY */}
      <section className="relative overflow-hidden border-t border-border py-24 sm:py-32 lg:py-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        />
        <div className="container-brand">
          <Reveal as="p" className="label-eyebrow">
            FILOSOFIA
          </Reveal>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal
                as="h2"
                className="text-balance font-display text-3xl font-semibold leading-[1.06] sm:text-5xl lg:text-6xl"
              >
                QUALITÀ SENZA
                <br />
                <span className="text-gradient-accent">COSTI INUTILI.</span>
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
            </div>
          </div>

          <ul className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-border sm:grid-cols-3">
            {PRINCIPLES.map((item, i) => (
              <li key={item.title} className="bg-background">
                <Reveal delay={i * 90} className="h-full">
                  <div className="h-full p-8 transition-colors duration-[var(--transition-base)] hover:bg-surface">
                    <span className="block h-px w-10 bg-primary" />
                    <h3 className="mt-6 font-display text-base font-semibold tracking-[0.12em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={180} className="mt-16">
            <p className="mx-auto max-w-3xl text-balance text-center font-display text-xl font-medium leading-snug sm:text-3xl">
              Professionalità digitale, alla portata di tutti.
            </p>
          </Reveal>
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
