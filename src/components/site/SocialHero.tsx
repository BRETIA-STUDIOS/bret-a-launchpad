import { useEffect, useState } from "react";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { useShouldAnimate } from "@/hooks/use-should-animate";
import { PhoneFrame } from "@/components/ui-brand/PhoneFrame";
import { cn } from "@/lib/utils";

import iconInstagramSrc from "@/assets/social/icon-instagram.webp";
import iconLinkedinSrc from "@/assets/social/icon-linkedin.webp";
import iconTiktokSrc from "@/assets/social/icon-tiktok.webp";
import iconYoutubeSrc from "@/assets/social/icon-youtube.webp";

const LABELS = ["STRATEGIA", "CONTENUTI", "GESTIONE", "ANALISI"];

const CHANNELS = [
  { name: "Instagram", src: iconInstagramSrc },
  { name: "TikTok", src: iconTiktokSrc },
  { name: "LinkedIn", src: iconLinkedinSrc },
  { name: "YouTube", src: iconYoutubeSrc },
];

/** Ritardi della sequenza d'entrata, in millisecondi. */
const T = {
  story: 260,
  storyStep: 110,
  post: 780,
  actions: 1020,
  caption: 1180,
  label: 1320,
  labelStep: 80,
} as const;

/**
 * Hero della pagina social: un telefono con un feed, non una finestra di
 * browser con un grafico.
 *
 * Il contenuto del post resta astratto — nessuna foto finta di un locale che
 * non esiste: un riquadro in gradiente d'accento fa da contenuto, e a
 * raccontare il servizio sono le storie in alto (i canali veri) e la riga
 * delle interazioni in basso.
 *
 * Due orologi separati, come nelle altre illustrazioni del sito: `entered`
 * fa scattare l'entrata una volta sola, `shouldAnimate` tiene vivi i due
 * loop (galleggiamento delle storie, pulsazione del "mi piace") solo mentre
 * qualcuno sta guardando.
 */
export function SocialHero() {
  const { ref: stageRef, shouldAnimate } = useShouldAnimate<HTMLDivElement>();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setEntered(true);
  }, [shouldAnimate]);

  return (
    <div ref={stageRef} className="flex flex-col items-center">
      <PhoneFrame
        glow
        role="img"
        aria-label="Un telefono che mostra un feed social: le storie dei canali Instagram, TikTok, LinkedIn e YouTube, un post e la riga delle interazioni."
        className={cn("smm-card w-full max-w-[17rem]", entered && "is-in")}
        screenClassName="px-4 pb-5 pt-8"
      >
        {/* Storie: i canali su cui lavoriamo, con l'anello d'accento sul primo. */}
        <div className="flex items-center justify-between">
          {CHANNELS.map((channel, i) => (
            <div
              key={channel.name}
              aria-hidden="true"
              className={cn("smm-fade-item", entered && "is-in")}
              style={{ animationDelay: `${T.story + i * T.storyStep}ms` }}
            >
              <div
                className={cn(
                  "smm-app-tile grid h-11 w-11 place-items-center rounded-full border bg-surface-2",
                  i === 0 ? "border-accent" : "border-border",
                  !shouldAnimate && "is-paused",
                )}
                style={{ animationDelay: `${i * 400}ms` }}
              >
                <img
                  src={channel.src}
                  alt=""
                  width={44}
                  height={44}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="h-5 w-5 object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Il post. */}
        <div
          aria-hidden="true"
          className={cn("smm-fade-item mt-6", entered && "is-in")}
          style={{ animationDelay: `${T.post}ms` }}
        >
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-full border border-accent/40 bg-surface-2" />
            <span className="block h-1.5 w-20 rounded-full bg-surface-2" />
          </div>
          <div
            className="mt-3 aspect-square w-full rounded-xl border border-accent/25"
            style={{
              background:
                "linear-gradient(150deg, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 65%)",
            }}
          />
        </div>

        {/* Interazioni: il "mi piace" è l'unico elemento che pulsa. */}
        <div
          aria-hidden="true"
          className={cn("smm-fade-item mt-4 flex items-center gap-4", entered && "is-in")}
          style={{ animationDelay: `${T.actions}ms` }}
        >
          <span className="relative text-accent">
            <Heart size={18} strokeWidth={1.5} fill="currentColor" />
            <span className="absolute -right-1 -top-1 grid place-items-center">
              <span
                className={cn(
                  "absolute h-3 w-3 rounded-full bg-accent/40",
                  shouldAnimate && "animate-ping",
                )}
              />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
          </span>
          <MessageCircle size={18} strokeWidth={1.5} className="text-muted-foreground" />
          <Send size={18} strokeWidth={1.5} className="text-muted-foreground" />
          <Bookmark size={18} strokeWidth={1.5} className="ml-auto text-muted-foreground" />
        </div>

        {/* Didascalia. */}
        <div
          aria-hidden="true"
          className={cn("smm-fade-item mt-4 flex flex-col gap-2", entered && "is-in")}
          style={{ animationDelay: `${T.caption}ms` }}
        >
          <span className="block h-1.5 w-full rounded-full bg-surface-2" />
          <span className="block h-1.5 w-2/3 rounded-full bg-surface-2" />
        </div>

        <span
          aria-hidden="true"
          className="mx-auto mt-auto block h-1 w-16 rounded-full bg-border-strong"
        />
      </PhoneFrame>

      <ul className="mt-10 flex list-none flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8">
        {LABELS.map((label, i) => (
          <li
            key={label}
            className={cn("smm-fade-item label-eyebrow", entered && "is-in")}
            style={{ animationDelay: `${T.label + i * T.labelStep}ms` }}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
