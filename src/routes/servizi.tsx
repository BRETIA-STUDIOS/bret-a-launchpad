import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ServiceShowcase } from "@/components/site/ServiceShowcase";
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
            index="01"
            visual={0}
            title="CREAZIONE DI SITI WEB"
            description="Partiamo da zero e costruiamo una presenza digitale pensata intorno alla tua attività. Ci confrontiamo con il cliente, ne comprendiamo esigenze e obiettivi e sviluppiamo un sito moderno, responsive e personalizzato, con la possibilità di integrare funzionalità come prenotazioni, pagamenti, moduli di contatto e altri strumenti utili."
            closing="Ogni progetto viene costruito sulle esigenze dell'attività, non adattato a un modello preconfezionato."
          />

          <ServiceShowcase
            index="02"
            visual={1}
            flip
            title="RESTYLING E RIVISITAZIONE"
            description="Un sito vecchio non deve necessariamente essere abbandonato. Analizziamo ciò che già funziona, ascoltiamo le esigenze del cliente e trasformiamo la presenza digitale esistente in un'esperienza più moderna, intuitiva e piacevole da utilizzare."
            closing="Conserviamo ciò che ha valore. Miglioriamo tutto ciò che può funzionare meglio."
          />

          <ServiceShowcase
            index="03"
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
            index="04"
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

          <Reveal>
            <Link
              to="/social-media-managing"
              className="group grid items-center gap-6 border-t border-border py-16 transition-colors duration-[var(--transition-base)] sm:py-20 lg:grid-cols-12 lg:gap-16"
            >
              <div className="lg:col-span-7">
                <span className="font-display text-xs tracking-[0.3em] text-brand">05</span>
                <h2 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-[0.04em] sm:text-3xl lg:text-[2.35rem]">
                  SOCIAL MEDIA MANAGING
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  Strategia, contenuti, gestione e analisi: costruiamo la presenza social
                  dell'attività senza che il titolare debba diventare un creator. È un servizio
                  autonomo, che non richiede un sito realizzato da BRETÌA.
                </p>
                <span className="mt-8 inline-flex items-center gap-3 font-display text-[0.8125rem] tracking-[0.1em] text-foreground">
                  SCOPRI IL SERVIZIO
                  <span
                    aria-hidden="true"
                    className="block h-px w-10 bg-border-strong transition-all duration-[var(--transition-base)] group-hover:w-16 group-hover:bg-primary"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>


      <ClosingCta
        eyebrow="PROSSIMO PASSO"
        title="Raccontaci la tua attività: troviamo insieme il servizio più adatto."
      />
    </>
  );
}
