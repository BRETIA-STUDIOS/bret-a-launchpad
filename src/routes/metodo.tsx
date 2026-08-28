import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui-brand/Reveal";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Metodo — BRETÌA Web Studio" },
      {
        name: "description",
        content: "Analizziamo, progettiamo, sviluppiamo e lanciamo: il metodo di lavoro di BRETÌA Web Studio.",
      },
      { property: "og:title", content: "Metodo — BRETÌA Web Studio" },
      { property: "og:description", content: "Dal primo messaggio al sito online: come lavoriamo." },
    ],
  }),
  component: Metodo,
});

const STEPS = [
  { index: "01", title: "ANALIZZIAMO", text: "Capiamo l'attività, gli obiettivi e le persone da raggiungere." },
  { index: "02", title: "PROGETTIAMO", text: "Definiamo struttura, contenuti e direzione visiva." },
  { index: "03", title: "SVILUPPIAMO", text: "Costruiamo un sito veloce, responsive e curato nel dettaglio." },
  { index: "04", title: "LANCIAMO", text: "Pubblichiamo, verifichiamo e accompagniamo l'attività online." },
];

function Metodo() {
  return (
    <>
      <PageHero
        eyebrow="IL NOSTRO METODO"
        title="Dal primo messaggio al sito online."
        description="Un processo chiaro e trasparente, pensato per rendere semplice ogni fase del progetto."
      />
      <section className="py-20 sm:py-28">
        <ol className="container-brand space-y-px overflow-hidden">
          {STEPS.map((step, i) => (
            <li key={step.index}>
              <Reveal delay={i * 80}>
                <div className="grid gap-4 border-b border-border py-10 transition-colors duration-[var(--transition-base)] hover:border-primary/50 sm:grid-cols-12 sm:items-baseline">
                  <span className="font-display text-xs tracking-[0.3em] text-primary sm:col-span-2">
                    {step.index}
                  </span>
                  <h2 className="font-display text-2xl font-semibold tracking-[0.08em] sm:col-span-4 sm:text-3xl">
                    {step.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-6 sm:text-base">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
