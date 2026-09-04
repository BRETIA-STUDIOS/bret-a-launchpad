import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck2, Gauge, PenTool, Smartphone } from "lucide-react";
import { ServiceShowcase, type ServiceFeature } from "@/components/site/ServiceShowcase";
import { BrandButton } from "@/components/ui-brand/BrandButton";
import { ClosingCta } from "@/components/site/ClosingCta";
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

/* Il paragrafo del primo blocco diventa un elenco: chi arriva qui sta
   valutando, e vuole vedere cosa comprende il servizio senza leggere. */
const WEB_FEATURES: ServiceFeature[] = [
  {
    icon: PenTool,
    title: "Design su misura",
    text: "Nessun template: struttura, identità e contenuti nascono dall'attività reale, non da un modello preconfezionato.",
  },
  {
    icon: Gauge,
    title: "Performance e SEO",
    text: "Caricamento rapido e basi tecniche pulite, perché un sito che nessuno trova o che fa aspettare non converte.",
  },
  {
    icon: CalendarCheck2,
    title: "Funzionalità su richiesta",
    text: "Prenotazioni, pagamenti, moduli di contatto e ogni strumento che serve davvero a chi visita il sito.",
  },
  {
    icon: Smartphone,
    title: "Responsive su ogni schermo",
    text: "La stessa esperienza da smartphone, tablet e desktop: il mobile è il primo schermo, non un ripiego.",
  },
];

function Servizi() {
  return (
    <>
      <section className="pb-6 sm:pb-10">
        <div className="container-brand">
          <ServiceShowcase
            lead
            visual={0}
            eyebrow="SERVIZI // SVILUPPO WEB"
            title="Infrastrutture digitali progettate per convertire"
            description="Partiamo da zero: ci confrontiamo con il cliente, ne comprendiamo esigenze e obiettivi e costruiamo una presenza digitale pensata intorno alla sua attività."
            features={WEB_FEATURES}
            closing="Codice proprietario e zero plugin pesanti: il tuo sito resta veloce, sicuro e tuo al 100%."
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
