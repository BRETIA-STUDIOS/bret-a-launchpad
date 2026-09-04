import { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useShouldAnimate } from "@/hooks/use-should-animate";
import { PhoneFrame } from "@/components/ui-brand/PhoneFrame";
import { cn } from "@/lib/utils";

/**
 * Le app nella griglia. `badge` marca l'unica che ha una notifica: è il
 * segnale che qualcosa si muove, non un contatore da leggere.
 *
 * TikTok non esiste fra le icone di lucide (la libreria ha dismesso i marchi
 * dopo i quattro storici), quindi la griglia si ferma a questi.
 */
const APPS = [
  { icon: Instagram, label: "Instagram", badge: true },
  { icon: Facebook, label: "Facebook", badge: false },
  { icon: Youtube, label: "YouTube", badge: false },
  { icon: Linkedin, label: "LinkedIn", badge: false },
];

/**
 * Mockup di uno smartphone con la griglia dei social.
 *
 * Due animazioni tenute su elementi diversi, come nelle altre illustrazioni
 * del sito: l'entrata in dissolvenza (`.smm-fade-item`) sta sul contenitore,
 * il galleggiamento continuo (`.smm-app-tile`) sul figlio. Sullo stesso nodo
 * si contenderebbero la proprietà `animation`.
 *
 * Il loop gira solo quando serve: `useShouldAnimate` lo ferma quando il
 * telefono esce dal viewport o la scheda va in secondo piano.
 */
export function SocialPhone() {
  const { ref, shouldAnimate } = useShouldAnimate<HTMLDivElement>();
  const [entered, setEntered] = useState(false);

  // Latch: l'entrata scatta al primo affaccio e resta. Legarla a
  // `shouldAnimate` farebbe risvanire il telefono a ogni uscita di scena.
  useEffect(() => {
    if (shouldAnimate) setEntered(true);
  }, [shouldAnimate]);

  return (
    <div ref={ref} className="flex justify-center">
      <PhoneFrame
        role="img"
        aria-label="Mockup di uno smartphone con le app dei social: Instagram, Facebook, YouTube e LinkedIn, con una notifica sulla prima."
        className={cn("smm-card w-full max-w-[15rem]", entered && "is-in")}
        screenClassName="px-4 pb-6 pt-7"
      >
        <span aria-hidden="true" className="mx-auto h-px w-10 bg-border-strong" />

        <div className="mt-6 grid grid-cols-2 gap-3">
          {APPS.map((app, i) => (
            <div
              key={app.label}
              className={cn("smm-fade-item", entered && "is-in")}
              style={{ animationDelay: `${240 + i * 120}ms` }}
            >
              <div
                className={cn(
                  "smm-app-tile relative grid aspect-square place-items-center rounded-2xl border border-border bg-surface-2 text-brand",
                  !shouldAnimate && "is-paused",
                )}
                style={{ animationDelay: `${i * 400}ms` }}
              >
                <app.icon aria-hidden="true" size={22} strokeWidth={1.5} />

                {app.badge ? (
                  <span
                    aria-hidden="true"
                    className="absolute -right-1 -top-1 grid place-items-center"
                  >
                    <span
                      className={cn(
                        "absolute h-3.5 w-3.5 rounded-full bg-accent/40",
                        shouldAnimate && "animate-ping",
                      )}
                    />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Righe del feed: il contenuto che continua sotto la griglia. */}
        <div
          aria-hidden="true"
          className={cn("smm-fade-item mt-7 flex flex-col gap-2.5", entered && "is-in")}
          style={{ animationDelay: "760ms" }}
        >
          <span className="block h-1.5 w-full rounded-full bg-surface-2" />
          <span className="block h-1.5 w-3/4 rounded-full bg-surface-2" />
          <span className="block h-1.5 w-4/5 rounded-full bg-surface-2" />
        </div>

        {/* Barra di navigazione: chiude il mockup senza aggiungere rumore. */}
        <span
          aria-hidden="true"
          className="mx-auto mt-auto block h-1 w-16 rounded-full bg-border-strong"
        />
      </PhoneFrame>
    </div>
  );
}
