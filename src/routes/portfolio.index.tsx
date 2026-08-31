import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ProjectShowcase } from "@/components/site/ProjectShowcase";
import { Reveal } from "@/components/ui-brand/Reveal";
import { ClosingCta } from "@/components/site/ClosingCta";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/portfolio/")({
  head: () =>
    pageHead({
      path: "/portfolio",
      title: "Portfolio — BRETÌA Web Studio",
      description:
        "Una selezione di identità digitali, siti web e concept progettati da BRETÌA Web Studio.",
      ogDescription: "Progetti che prendono forma: identità digitali e concept firmati BRETÌA.",
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
          <Reveal as="p" className="text-xs uppercase tracking-[0.28em] text-muted-foreground/70">
            Trascina per esplorare
          </Reveal>
        </div>
      </section>

      <ClosingCta
        title="Un progetto in mente?"
        description="Costruiamolo insieme."
        ctaLabel="PARLIAMONE"
      />
    </>
  );
}
