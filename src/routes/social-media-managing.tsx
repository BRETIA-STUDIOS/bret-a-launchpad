import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta } from "@/components/site/ClosingCta";
import { SocialHero } from "@/components/site/SocialHero";
import { SectionHeading } from "@/components/ui-brand/SectionHeading";
import { Reveal } from "@/components/ui-brand/Reveal";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/social-media-managing")({
  head: () =>
    pageHead({
      path: "/social-media-managing",
      title: "Social Media Managing — BRETÌA Web Studio",
      description:
        "Strategia, contenuti, gestione e analisi: BRETÌA costruisce la presenza social della tua attività senza che tu debba diventare un creator.",
      ogTitle: "Social Media Managing — BRETÌA Web Studio",
      ogDescription:
        "La tua presenza digitale, fatta bene. Gestiamo i social della tua attività con strategia, contenuti e continuità.",
    }),
  component: SocialMediaManaging,
});

const PILLARS = [
  {
    title: "Strategia",
    text: "Definiamo una direzione chiara per la presenza digitale dell'attività.",
  },
  {
    title: "Contenuti",
    text: "Post, Stories, Reel e grafiche costruiti intorno all'identità del brand.",
  },
  {
    title: "Gestione",
    text: "Organizziamo, programmiamo e gestiamo la pubblicazione dei contenuti.",
  },
  {
    title: "Analisi",
    text: "Osserviamo ciò che funziona e utilizziamo i risultati per migliorare il lavoro.",
  },
];

const FLOW = ["ATTIVITÀ", "CONTENUTO", "PUBBLICAZIONE", "PRESENZA DIGITALE"];

function SocialMediaManaging() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-veil)" }}
        />
        <div className="container-brand relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal as="p" className="label-eyebrow">
              SOCIAL MEDIA MANAGING
            </Reveal>
            <Reveal
              as="h1"
              delay={120}
              className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
            >
              La tua presenza digitale.
              <br />
              Fatta bene.
            </Reveal>
            <Reveal
              as="p"
              delay={260}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Gestiamo i tuoi social trasformando ciò che rende unica la tua attività in contenuti
              capaci di raccontarla, valorizzarla e farla ricordare.
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <SocialHero />
          </div>
        </div>
      </section>

      {/* FILOSOFIA */}
      <section className="border-b border-border py-24 sm:py-32">
        <div className="container-brand">
          <SectionHeading
            eyebrow="IL PUNTO DI PARTENZA"
            title={
              <>
                Non devi diventare
                <br />
                un creator.
                <br />
                Deve diventare protagonista
                <br />
                la tua attività.
              </>
            }
            description={
              <>
                Non è necessario mettersi davanti alla fotocamera. Raccontiamo ciò che rende
                riconoscibile la tua attività: il locale, i prodotti, i dettagli, l'atmosfera e
                tutto ciò che la rende diversa.
              </>
            }
          />
          <Reveal
            as="p"
            delay={200}
            className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground"
          >
            Costruiamo una presenza social attorno all'attività reale, non attorno alla persona:
            titolare e collaboratori non devono comparire di continuo per avere una comunicazione
            costante e riconoscibile.
          </Reveal>
        </div>
      </section>

      {/* COSA COMPRENDE */}
      <section className="border-b border-border bg-surface/30 py-24 sm:py-32">
        <div className="container-brand">
          <SectionHeading eyebrow="COSA COMPRENDE" title="Il servizio, in quattro parti." />
          <div className="mt-16 grid gap-x-16 gap-y-12 sm:grid-cols-2">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90}>
                <div className="border-t border-border pt-7">
                  <h3 className="font-display text-xl font-semibold tracking-[0.04em] sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                    {pillar.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENUTI GIÀ PRESENTI */}
      <section className="border-b border-border py-24 sm:py-32">
        <div className="container-brand">
          <SectionHeading
            eyebrow="MATERIA PRIMA"
            title={
              <>
                Il tuo locale
                <br />è già pieno di contenuti.
              </>
            }
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
                {[
                  "Un piatto appena servito.",
                  "Un dettaglio del locale.",
                  "La preparazione di una portata.",
                  "Un tavolo apparecchiato.",
                  "Un momento della giornata.",
                ].map((line) => (
                  <li key={line} className="border-b border-border pb-3">
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={140} className="lg:col-span-6">
              <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
                Non dobbiamo inventare un'identità.
                <br />
                Dobbiamo saperla osservare, valorizzare e raccontare.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-16">
            <div className="flex flex-col gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:gap-6">
              {FLOW.map((step, i) => (
                <div key={step} className="flex items-center gap-4 sm:gap-6">
                  <span className="font-display text-[0.6875rem] tracking-[0.24em] text-foreground/80 sm:text-xs">
                    {step}
                  </span>
                  {i < FLOW.length - 1 ? (
                    <span aria-hidden="true" className="text-brand">
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* NUMERI */}
      <section className="border-b border-border bg-surface/30 py-28 sm:py-36">
        <div className="container-brand">
          <Reveal
            as="h2"
            className="max-w-4xl text-balance font-display text-3xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Non inseguiamo
            <br />
            numeri vuoti.
          </Reveal>
          <Reveal
            as="p"
            delay={140}
            className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Costruiamo una presenza digitale riconoscibile, coerente e utile all'attività. Follower,
            like e visualizzazioni sono indicatori. Non sono il punto di partenza.
          </Reveal>
        </div>
      </section>

      {/* PRODUZIONE CONTENUTI */}
      <section className="border-b border-border py-24 sm:py-32">
        <div className="container-brand">
          <SectionHeading
            eyebrow="PRODUZIONE"
            title={
              <>
                Hai già dei contenuti? Li valorizziamo.
                <br />
                Ti serve materiale nuovo? Lo organizziamo.
              </>
            }
            description="Partiamo da ciò che l'attività ha già a disposizione e lo trasformiamo in una presenza digitale coerente. Quando serve una produzione fotografica o video dedicata, possiamo organizzarla in base alle esigenze del progetto."
          />
        </div>
      </section>

      {/* WEB + SOCIAL */}
      <section className="border-b border-border bg-surface/30 py-24 sm:py-32">
        <div className="container-brand">
          <SectionHeading
            eyebrow="WEB E SOCIAL"
            title={
              <>
                I social raccontano.
                <br />
                Il sito approfondisce.
              </>
            }
            description="Una presenza digitale efficace non deve per forza partire da un sito. E non deve necessariamente includere i social. Sono strumenti diversi, che possono funzionare insieme quando serve."
          />
          <Reveal
            as="p"
            delay={200}
            className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground"
          >
            Il Social Media Managing è un servizio autonomo: non richiede un sito realizzato da
            BRETÌA. Se il sito c'è, o arriverà più avanti, i due lavori si sostengono a vicenda.
          </Reveal>
        </div>
      </section>

      <ClosingCta
        eyebrow="HAI QUALCOSA DA RACCONTARE?"
        title="Dicci cosa hai in mente."
        ctaLabel="Parliamone"
        to="/contatti"
      />
    </>
  );
}
