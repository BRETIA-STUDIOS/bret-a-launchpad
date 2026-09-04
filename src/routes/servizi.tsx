import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ServiceShowcase } from "@/components/site/ServiceShowcase";
import { BrandButton } from "@/components/ui-brand/BrandButton";
import { ClosingCta } from "@/components/site/ClosingCta";
import { Reveal } from "@/components/ui-brand/Reveal";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/servizi")({
  head: () =>
    pageHead({
      path: "/servizi",
      title: "Servizi — BRETÌA Web Studio",
      description:
        "Creazione di siti web, restyling, manutenzione e assistenza, rebranding: i servizi di BRETÌA Web Studio.",
      ogDescription:
        "Quello che possiamo fare per te: nuovi siti web, restyling, manutenzione e rebranding.",
    }),
  component: Servizi,
});

function Servizi() {
  return (
    <>
      <PageHero
        eyebrow="SERVIZI"
        title="Quello che possiamo fare per te."
        description="Dalla creazione di un nuovo sito alla trasformazione di una presenza digitale già esistente."
      />

      <section className="py-6 sm:py-10">
        <div className="container-brand">
          <ServiceShowcase
            visual={0}
            title="CREAZIONE DI SITI WEB"
            description="Partiamo da zero e costruiamo una presenza digitale pensata intorno alla tua attività. Ci confrontiamo con il cliente, ne comprendiamo esigenze e obiettivi e sviluppiamo un sito moderno, responsive e personalizzato, con la possibilità di integrare funzionalità come prenotazioni, pagamenti, moduli di contatto e altri strumenti utili."
            closing="Ogni progetto viene costruito sulle esigenze dell'attività, non adattato a un modello preconfezionato."
          />

          <ServiceShowcase
            visual={1}
            flip
            title="RESTYLING E RIVISITAZIONE"
            description="Un sito vecchio non deve necessariamente essere abbandonato. Analizziamo ciò che già funziona, ascoltiamo le esigenze del cliente e trasformiamo la presenza digitale esistente in un'esperienza più moderna, intuitiva e piacevole da utilizzare."
            closing="Conserviamo ciò che ha valore. Miglioriamo tutto ciò che può funzionare meglio."
          />

          <ServiceShowcase
            visual={2}
            title="MANUTENZIONE E ASSISTENZA"
            description="Dopo la pubblicazione, un sito può avere bisogno di aggiornamenti e interventi nel tempo. Per questo offriamo un servizio di manutenzione ordinaria dedicato alle esigenze del cliente."
            extra={
              <p className="text-base leading-relaxed text-muted-foreground">
                Ogni sito realizzato da BRETÌA include{" "}
                <span className="text-foreground">
                  30 giorni di manutenzione ordinaria gratuita
                </span>{" "}
                dalla pubblicazione. Successivamente è possibile scegliere un servizio di
                manutenzione mensile, con diversi livelli di assistenza in base alle necessità
                dell'attività.
              </p>
            }
            closing="Il sito si acquista una sola volta. La manutenzione continuativa, dopo i primi 30 giorni, resta facoltativa."
          />

          <ServiceShowcase
            visual={3}
            flip
            title="REBRANDING"
            description="Un'attività può avere una storia importante e avere comunque bisogno di una nuova identità digitale. BRETÌA può accompagnare il cliente in un percorso di rinnovamento completo: dall'identità visiva al sito web, fino agli elementi che rendono riconoscibile il brand online e offline."
            extra={
              <p className="text-sm leading-relaxed text-muted-foreground">
                Il percorso può comprendere revisione o nuova progettazione del logo, identità
                visiva, materiali coordinati, elementi grafici per la comunicazione, supporto alla
                presenza sui social e indicazioni strategiche sulla comunicazione digitale.
              </p>
            }
            closing="Dare nuova vita a un'attività che ha già una storia, senza cancellarne l'identità."
          />

          <ServiceShowcase
            visual={4}
            flip
            title="SOCIAL MEDIA MANAGING"
            description="Strategia, contenuti, gestione e analisi: costruiamo la presenza social dell'attività senza che il titolare debba diventare un creator. È un servizio autonomo, che non richiede un sito realizzato da BRETÌA."
            cta={
              <BrandButton to="/social-media-managing" variant="secondary">
                Scopri il servizio social
              </BrandButton>
            }
          />
        </div>
      </section>

      <ClosingCta
        eyebrow="PROSSIMO PASSO"
        title="Raccontaci la tua attività: troviamo insieme il servizio più adatto."
      />
    </>
  );
}
