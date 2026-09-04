import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui-brand/Reveal";
import { SectionHeading } from "@/components/ui-brand/SectionHeading";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { ClosingCta } from "@/components/site/ClosingCta";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/chi-siamo")({
  head: () =>
    pageHead({
      path: "/chi-siamo",
      title: "Chi siamo — BRETÌA Web Studio",
      description:
        "BRETÌA è un web studio indipendente: riduciamo ciò che non serve, non la qualità. Presenza digitale professionale per piccole e medie attività.",
      ogDescription:
        "Un web studio indipendente e agile. Professionalità digitale, senza compromessi inutili.",
    }),
  component: ChiSiamo,
});

const PRINCIPI = [
  {
    title: "DIRETTI",
    text: "Un rapporto diretto con chi segue il progetto.",
  },
  {
    title: "SU MISURA",
    text: "Ogni progetto nasce dalle esigenze reali dell'attività.",
  },
  {
    title: "AGILI",
    text: "Processi efficienti, meno passaggi inutili.",
  },
  {
    title: "CURATI",
    text: "Ogni dettaglio viene progettato per essere visto, usato e ricordato.",
  },
];

function RuleLine({ delay = 0 }: { delay?: number }) {
  return (
    <Reveal delay={delay} className="w-full origin-left">
      <span aria-hidden="true" className="block h-px w-full bg-border" />
    </Reveal>
  );
}

function ChiSiamo() {
  return (
    <>
      <PageHero
        eyebrow="CHI SIAMO"
        title="Una grande presenza digitale. Senza tutto ciò che non ti serve."
        description="BRETÌA è un web studio indipendente nato con un'idea semplice: rendere la professionalità digitale realmente accessibile anche alle piccole e medie attività."
      />

      {/* 02 — Perché esiste BRETÌA */}
      <section className="py-20 sm:py-28">
        <div className="container-brand grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal as="p" className="label-eyebrow">
              PERCHÉ ESISTIAMO
            </Reveal>
            <Reveal
              as="h2"
              delay={80}
              className="mt-5 text-balance text-3xl font-semibold leading-[1.08] sm:text-4xl"
            >
              Non devi essere una grande azienda per comunicare da grande.
            </Reveal>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7 sm:text-lg">
            <Reveal as="p" delay={120}>
              Molte attività hanno bisogno di una presenza digitale professionale, ma spesso si
              trovano davanti a strutture complesse, pacchetti rigidi e costi che non sempre
              corrispondono a ciò di cui hanno realmente bisogno.
            </Reveal>
            <Reveal as="p" delay={180}>
              BRETÌA nasce per fare una cosa diversa: ascoltare l'attività, capire cosa serve
              davvero e concentrare risorse su ciò che crea valore.
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — Il nostro approccio */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-28">
        <div className="container-brand grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal as="p" className="label-eyebrow">
              IL NOSTRO APPROCCIO
            </Reveal>
            <Reveal
              as="h2"
              delay={80}
              className="mt-5 text-balance text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-5xl"
            >
              Riduciamo ciò che non serve.
              <br />
              <span className="text-gradient-accent">Non la qualità.</span>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal
              as="p"
              delay={140}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Una struttura agile e processi produttivi efficienti ci permettono di concentrare il
              lavoro su design, funzionalità, esperienza e cura del dettaglio.
            </Reveal>
            <Reveal delay={200} className="mt-8">
              <p className="border-l border-primary pl-6 font-display text-lg leading-snug text-foreground sm:text-xl">
                Ogni progetto viene costruito intorno all'attività, non adattato a un modello
                preconfezionato.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 — Cosa ci rende diversi */}
      <section className="py-20 sm:py-28">
        <div className="container-brand">
          <SectionHeading
            eyebrow="COSA CI RENDE DIVERSI"
            title={
              <>
                Quattro scelte,
                <br />
                <span className="text-gradient-accent">non quattro slogan.</span>
              </>
            }
          />
          <div className="mt-14 grid gap-px border-t border-border sm:grid-cols-2">
            {PRINCIPI.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 90}
                className="group border-b border-border py-8 pr-6 sm:py-10 sm:[&:nth-child(odd)]:pr-12 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:pl-12"
              >
                <h3 className="font-display text-2xl font-semibold tracking-[0.04em] sm:text-3xl">
                  {p.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-10 bg-border-strong transition-all duration-[var(--transition-base)] group-hover:w-20 group-hover:bg-primary"
                />
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {p.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Posizionamento */}
      <section className="relative overflow-hidden border-y border-border py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-veil)" }}
        />
        <div className="container-brand relative max-w-4xl text-center">
          <Reveal
            as="h2"
            className="text-balance text-3xl font-semibold leading-[1.06] sm:text-4xl lg:text-5xl"
          >
            Una piccola attività non deve avere una piccola presenza digitale.
          </Reveal>
          <Reveal
            as="p"
            delay={140}
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Il nostro obiettivo è permettere a chi lavora bene di presentarsi online con la stessa
            cura, credibilità e attenzione che mette ogni giorno nella propria attività.
          </Reveal>
        </div>
      </section>

      {/* 06 — Momento identità */}
      <section className="py-24 sm:py-32">
        <div className="container-brand flex flex-col items-center text-center">
          <RuleLine />
          <Reveal delay={120} className="mt-14">
            <BretiaSymbol className="h-20 w-auto sm:h-28" title="Simbolo BRETÌA" />
          </Reveal>
          <Reveal as="p" delay={240} className="label-eyebrow mt-10">
            WEB STUDIO INDIPENDENTE
          </Reveal>
          <div className="mt-14 w-full">
            <RuleLine delay={300} />
          </div>
        </div>
      </section>

      {/* 07 — Messaggio finale */}
      <ClosingCta
        eyebrow="BRETÌA"
        title="Professionalità digitale, senza compromessi inutili."
        description="Dalla prima idea alla presenza online, costruiamo strumenti digitali pensati per funzionare davvero per chi li utilizza."
      />
    </>
  );
}
