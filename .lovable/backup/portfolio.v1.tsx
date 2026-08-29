import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PortfolioCard } from "@/components/site/PortfolioCard";
import conceptRestaurant from "@/assets/concept-restaurant.jpg";
import conceptAutomotive from "@/assets/concept-automotive.jpg";
import conceptBeauty from "@/assets/concept-beauty.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — BRETÌA Web Studio" },
      {
        name: "description",
        content: "Concept e progetti visivi realizzati da BRETÌA Web Studio: restaurant, automotive, beauty.",
      },
      { property: "og:title", content: "Portfolio — BRETÌA Web Studio" },
      { property: "og:description", content: "Progetti che parlano: i concept firmati BRETÌA." },
    ],
  }),
  component: Portfolio,
});

const PROJECTS = [
  { title: "RESTAURANT", caption: "Identità digitale per la ristorazione.", image: conceptRestaurant },
  { title: "AUTOMOTIVE", caption: "Presentazione veicoli e servizi.", image: conceptAutomotive },
  { title: "BEAUTY", caption: "Prenotazioni e trattamenti.", image: conceptBeauty },
];

function Portfolio() {
  return (
    <>
      <PageHero
        eyebrow="PORTFOLIO"
        title="Progetti che parlano."
        description="Una selezione di concept sviluppati internamente per mostrare la nostra direzione progettuale."
      />
      <section className="py-20 sm:py-28">
        <div className="container-brand grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <PortfolioCard key={project.title} {...project} delay={i * 90} />
          ))}
        </div>
      </section>
    </>
  );
}
