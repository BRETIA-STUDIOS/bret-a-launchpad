import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { MethodFlow } from "@/components/site/MethodFlow";

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

function Metodo() {
  return (
    <>
      <PageHero
        eyebrow="IL NOSTRO METODO"
        title="Dal primo messaggio al sito online."
        description="Un processo chiaro e trasparente, pensato per rendere semplice ogni fase del progetto."
      />
      <section className="py-20 sm:py-28">
        <div className="container-brand">
          <MethodFlow />
        </div>
      </section>
    </>
  );
}

