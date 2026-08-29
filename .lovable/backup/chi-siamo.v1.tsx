import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui-brand/Reveal";
import { BrandButton } from "@/components/ui-brand/BrandButton";

export const Route = createFileRoute("/chi-siamo")({
  head: () => ({
    meta: [
      { title: "Chi siamo — BRETÌA Web Studio" },
      {
        name: "description",
        content:
          "BRETÌA è un web studio italiano indipendente e agile: qualità senza costi inutili, per ogni attività.",
      },
      { property: "og:title", content: "Chi siamo — BRETÌA Web Studio" },
      {
        property: "og:description",
        content: "Un web studio indipendente e agile. Professionalità digitale, alla portata di tutti.",
      },
    ],
  }),
  component: ChiSiamo,
});

function ChiSiamo() {
  return (
    <>
      <PageHero
        eyebrow="CHI SIAMO"
        title="Un web studio indipendente e agile."
        description="BRETÌA nasce da un'idea semplice: la professionalità digitale non dovrebbe essere un lusso."
      />
      <section className="py-20 sm:py-28">
        <div className="container-brand grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal as="h2" className="text-balance text-3xl font-semibold leading-[1.08] sm:text-4xl">
              QUALITÀ SENZA COSTI INUTILI.
            </Reveal>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground lg:col-span-5 sm:text-lg">
            <Reveal as="p" delay={80}>
              Una struttura agile e processi produttivi efficienti ci permettono di concentrare le
              nostre risorse su ciò che conta davvero: design, funzionalità e cura del dettaglio.
            </Reveal>
            <Reveal as="p" delay={140}>
              Essere una piccola attività non significa dover avere una piccola presenza digitale.
            </Reveal>
            <Reveal delay={200}>
              <BrandButton to="/contatti">Parliamone</BrandButton>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
