import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/ServiceCard";
import { BrandButton } from "@/components/ui-brand/BrandButton";
import { Reveal } from "@/components/ui-brand/Reveal";

export const Route = createFileRoute("/servizi")({
  head: () => ({
    meta: [
      { title: "Servizi — BRETÌA Web Studio" },
      {
        name: "description",
        content:
          "Siti web, restyling, digital experience, prenotazioni e integrazioni: i servizi di BRETÌA Web Studio.",
      },
      { property: "og:title", content: "Servizi — BRETÌA Web Studio" },
      {
        property: "og:description",
        content: "Dal primo concept al sito online: i servizi di BRETÌA Web Studio.",
      },
    ],
  }),
  component: Servizi,
});

const SERVICES = [
  { index: "01", title: "SITI WEB", description: "Siti moderni e responsive progettati intorno all'identità dell'attività." },
  { index: "02", title: "RESTYLING", description: "Trasformiamo siti datati in esperienze più moderne, chiare ed efficaci." },
  { index: "03", title: "DIGITAL EXPERIENCE", description: "Progettiamo esperienze digitali semplici, intuitive e piacevoli da utilizzare." },
  { index: "04", title: "PRENOTAZIONI & INTEGRAZIONI", description: "Colleghiamo il sito agli strumenti digitali più adatti alle esigenze dell'attività." },
];

function Servizi() {
  return (
    <>
      <PageHero
        eyebrow="COSA FACCIAMO"
        title="Dal primo concept al sito online."
        description="Progettiamo e sviluppiamo presenze digitali complete, curate in ogni dettaglio e pensate per durare nel tempo."
      />
      <section className="py-20 sm:py-28">
        <div className="container-brand grid gap-5 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.index} {...service} delay={i * 80} />
          ))}
        </div>
        <div className="container-brand mt-20 text-center">
          <Reveal>
            <BrandButton to="/contatti" size="lg">
              Parliamone
            </BrandButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
