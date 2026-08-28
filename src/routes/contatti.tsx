import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui-brand/Reveal";
import { BrandButton } from "@/components/ui-brand/BrandButton";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti — BRETÌA Web Studio" },
      {
        name: "description",
        content: "Hai un progetto? Raccontaci cosa hai in mente: scrivi a BRETÌA Web Studio.",
      },
      { property: "og:title", content: "Contatti — BRETÌA Web Studio" },
      { property: "og:description", content: "Hai un progetto? Raccontaci cosa hai in mente." },
    ],
  }),
  component: Contatti,
});

const fieldClass =
  "mt-2 w-full rounded-[var(--radius-lg)] border border-input bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors duration-200 focus:border-primary focus:outline-none";

function Contatti() {
  return (
    <>
      <PageHero
        eyebrow="CONTATTI"
        title="Hai un progetto?"
        description="Raccontaci cosa hai in mente. Ti rispondiamo con una proposta chiara e trasparente."
      />
      <section className="py-20 sm:py-28">
        <div className="container-brand grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label-eyebrow">Scrivici</p>
              <a
                href="mailto:hello@bretia.studio"
                className="mt-4 block font-display text-xl font-medium transition-colors duration-200 hover:text-primary sm:text-2xl"
              >
                hello@bretia.studio
              </a>
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Italia — lavoriamo da remoto con attività di tutta la penisola.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <form
                className="surface-card space-y-6 p-7 sm:p-9"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label htmlFor="nome" className="label-eyebrow">
                    Nome
                  </label>
                  <input id="nome" name="nome" type="text" className={fieldClass} placeholder="Il tuo nome" />
                </div>
                <div>
                  <label htmlFor="email" className="label-eyebrow">
                    Email
                  </label>
                  <input id="email" name="email" type="email" className={fieldClass} placeholder="nome@esempio.it" />
                </div>
                <div>
                  <label htmlFor="messaggio" className="label-eyebrow">
                    Messaggio
                  </label>
                  <textarea
                    id="messaggio"
                    name="messaggio"
                    rows={5}
                    className={fieldClass}
                    placeholder="Raccontaci il tuo progetto"
                  />
                </div>
                <BrandButton type="submit" size="lg" className="w-full sm:w-auto">
                  Parliamone
                </BrandButton>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
