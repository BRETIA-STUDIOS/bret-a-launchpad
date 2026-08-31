import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { MethodFlow } from "@/components/site/MethodFlow";
import { Reveal } from "@/components/ui-brand/Reveal";
import { ClosingCta } from "@/components/site/ClosingCta";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/metodo")({
  head: () =>
    pageHead({
      path: "/metodo",
      title: "Metodo — BRETÌA Web Studio",
      description:
        "Analizziamo, progettiamo, sviluppiamo e lanciamo: il metodo di lavoro di BRETÌA Web Studio.",
      ogDescription: "Dal primo messaggio al sito online: come lavoriamo.",
    }),
  component: Metodo,
});

const AFTER_LAUNCH_POINTS = [
  {
    title: "RESPONSIVE",
    text: "Pensato per desktop, tablet e smartphone.",
  },
  {
    title: "OTTIMIZZATO",
    text: "Prestazioni, struttura e dettagli curati.",
  },
  {
    title: "PRONTO A CRESCERE",
    text: "Una base digitale che può evolvere insieme all'attività.",
  },
];

function Metodo() {
  return (
    <>
      <PageHero
        eyebrow="IL NOSTRO METODO"
        title="Dal primo messaggio al sito online."
        description="Un processo chiaro e trasparente, pensato per rendere semplice ogni fase del progetto."
      />

      {/* Approccio — prima del processo */}
      <section className="py-20 sm:py-28">
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
              Non partiamo dal sito.
              <br />
              <span className="text-gradient-accent">Partiamo da te.</span>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal
              as="p"
              delay={140}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Prima di progettare una pagina, cerchiamo di capire l'attività, le persone a cui si
              rivolge e ciò che vuole comunicare. Ogni progetto nasce da un confronto diretto. Da lì
              costruiamo una direzione chiara, senza complicare ciò che può essere semplice.
            </Reveal>
            <Reveal delay={200} className="mt-8">
              <p className="border-l border-primary pl-6 font-display text-lg leading-snug text-foreground sm:text-xl">
                Niente soluzioni preconfezionate.
                <br />
                Ogni progetto parte da un'esigenza reale.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Processo timeline — invariato nella struttura */}
      <section className="py-20 sm:py-28">
        <div className="container-brand">
          <MethodFlow />
        </div>
      </section>

      {/* Oltre il lancio */}
      <section className="py-20 sm:py-28">
        <div className="container-brand">
          <div className="max-w-3xl">
            <Reveal as="p" className="label-eyebrow">
              OLTRE IL LANCIO
            </Reveal>
            <Reveal
              as="h2"
              delay={80}
              className="mt-5 text-balance text-3xl font-semibold leading-[1.08] sm:text-4xl"
            >
              Il progetto non finisce quando pubblichiamo.
            </Reveal>
            <Reveal
              as="p"
              delay={150}
              className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Verifichiamo che tutto funzioni correttamente, ottimizziamo la visualizzazione sui
              diversi dispositivi e lasciamo una base solida su cui continuare a costruire.
            </Reveal>
          </div>

          <div className="mt-14 grid gap-px border-t border-border sm:grid-cols-3">
            {AFTER_LAUNCH_POINTS.map((point, i) => (
              <Reveal
                key={point.title}
                delay={i * 90}
                className="border-b border-border py-8 sm:py-10 sm:pr-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8"
              >
                <h3 className="font-display text-sm tracking-[0.22em] text-brand">{point.title}</h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {point.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="HAI UN PROGETTO?"
        title="Raccontaci cosa hai in mente."
        ctaLabel="Parliamone"
      />
    </>
  );
}

export default Metodo;
