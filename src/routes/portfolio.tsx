import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ProjectShowcase } from "@/components/site/ProjectShowcase";
import { BrandButton } from "@/components/ui-brand/BrandButton";
import { Reveal } from "@/components/ui-brand/Reveal";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — BRETÌA Web Studio" },
      {
        name: "description",
        content:
          "Una selezione di identità digitali, siti web e concept progettati da BRETÌA Web Studio.",
      },
      { property: "og:title", content: "Portfolio — BRETÌA Web Studio" },
      {
        property: "og:description",
        content: "Progetti che prendono forma: identità digitali e concept firmati BRETÌA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <>
      <PageHero
        eyebrow="PORTFOLIO"
        title="Progetti che prendono forma."
        description="Una selezione di identità digitali, siti web e concept progettati da BRETÌA."
      />

      <section className="overflow-hidden py-20 sm:py-28">
        <Reveal>
          <ProjectShowcase />
        </Reveal>
        <div className="container-brand mt-10">
          <Reveal
            as="p"
            className="text-xs uppercase tracking-[0.28em] text-muted-foreground/70"
          >
            Trascina per esplorare
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-24 text-center sm:py-32">
        <div className="container-brand">
          <Reveal
            as="h2"
            className="font-display text-3xl font-semibold leading-[1.06] sm:text-5xl"
          >
            Un progetto in mente?
          </Reveal>
          <Reveal as="p" delay={100} className="mt-5 text-base text-muted-foreground sm:text-lg">
            Costruiamolo insieme.
          </Reveal>
          <Reveal delay={170} className="mt-10">
            <BrandButton to="/contatti" size="lg">
              PARLIAMONE
            </BrandButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
