import { Eye, Heart, Images, Play, Scan } from "lucide-react";
import { BretiaSymbol } from "@/components/brand/BretiaSymbol";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

/**
 * Le cinque forme in cui il materiale del locale diventa contenuto.
 *
 * Ogni anteprima è una micro-UI del formato sopra una foto vera: si riconosce
 * il player, il carosello, lo scatto, il dettaglio e la storia prima ancora di
 * leggere il tag.
 *
 * La foto sta in `object-cover` sotto un velo in gradiente verso il fondo
 * pagina: senza quello i badge chiari finirebbero su porzioni di immagine
 * troppo luminose. Tutto ciò che è UI vive sopra, in `z-10`.
 */
export type RawMaterialKind = "reel" | "snapshot" | "dettaglio" | "carosello" | "stories";

export type RawMaterialItem = {
  kind: RawMaterialKind;
  tag: string;
  title: string;
  value: string;
  /** Foto di fondo dell'anteprima, importata dagli asset del progetto. */
  image: string;
};

/** Pill dei badge: stesso trattamento per contatori e indicatori. */
const BADGE =
  "inline-flex items-center gap-1 rounded-full border border-accent/30 bg-background/70 px-2 py-0.5 font-display text-[0.625rem] tracking-[0.08em] text-foreground/90 backdrop-blur-sm";

function Preview({ kind }: { kind: RawMaterialKind }) {
  switch (kind) {
    // Player: tasto centrale, contatore visualizzazioni, barra di avanzamento.
    case "reel":
      return (
        <>
          <span className={cn(BADGE, "absolute right-2 top-2 z-10")}>
            <Eye size={11} strokeWidth={2} />
            14.2k
          </span>
          <span className="absolute left-1/2 top-1/2 z-10 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/50 bg-background/60 text-accent backdrop-blur-sm">
            <Play size={16} strokeWidth={1.5} fill="currentColor" className="ml-0.5" />
          </span>
          <span className="absolute inset-x-0 bottom-0 z-10 block h-0.5 bg-foreground/20">
            <span className="block h-full w-2/5 bg-accent" />
          </span>
        </>
      );

    // Scatto singolo: mirini agli angoli e il "mi piace".
    case "snapshot":
      return (
        <>
          <span className={cn(BADGE, "absolute right-2 top-2 z-10")}>
            <Heart size={11} strokeWidth={2} fill="currentColor" className="text-destructive" />
            312
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-3 z-10 rounded-lg border border-foreground/15"
          />
          <span
            aria-hidden="true"
            className="absolute left-3 top-3 z-10 h-4 w-4 rounded-tl-lg border-l border-t border-accent"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 z-10 h-4 w-4 rounded-br-lg border-b border-r border-accent"
          />
        </>
      );

    // Dettaglio: il mirino stringe su un punto solo.
    case "dettaglio":
      return (
        <>
          <span className={cn(BADGE, "absolute right-2 top-2 z-10")}>
            <Heart size={11} strokeWidth={2} fill="currentColor" className="text-destructive" />
            186
          </span>
          <span className="absolute left-1/2 top-1/2 z-10 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-dashed border-accent/60 text-accent">
            <Scan size={16} strokeWidth={1.5} />
          </span>
        </>
      );

    // Carosello: schede sfalsate dietro la prima, indicatore 1/5.
    case "carosello":
      return (
        <>
          <span className={cn(BADGE, "absolute right-2 top-2 z-10")}>
            <Images size={11} strokeWidth={2} />
            1/5
          </span>
          <span
            aria-hidden="true"
            className="absolute right-4 top-6 z-0 h-16 w-14 rotate-6 rounded-lg border border-foreground/15 bg-background/40"
          />
          <span
            aria-hidden="true"
            className="absolute right-7 top-7 z-0 h-16 w-14 rotate-3 rounded-lg border border-foreground/20 bg-background/60"
          />
          <span
            aria-hidden="true"
            className="absolute left-4 top-7 z-10 h-16 w-14 rounded-lg border border-accent/50 bg-background/70"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-2.5 z-10 flex justify-center gap-1"
          >
            {[0, 1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className={cn(
                  "block h-1 w-1 rounded-full",
                  dot === 0 ? "bg-accent" : "bg-foreground/25",
                )}
              />
            ))}
          </span>
        </>
      );

    // Storia: anello gradiente attorno all'avatar e barre dei segmenti.
    case "stories":
      return (
        <>
          <span aria-hidden="true" className="absolute inset-x-2 top-1.5 z-10 flex gap-1">
            <span className="block h-0.5 flex-1 rounded-full bg-accent" />
            <span className="block h-0.5 flex-1 rounded-full bg-foreground/20" />
            <span className="block h-0.5 flex-1 rounded-full bg-foreground/20" />
          </span>
          <span
            className="absolute left-1/2 top-1/2 z-10 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full p-[2px]"
            style={{
              background:
                "conic-gradient(from 210deg, var(--color-accent), color-mix(in oklab, var(--color-accent) 25%, transparent) 55%, var(--color-accent))",
            }}
          >
            <span className="grid h-full w-full place-items-center rounded-full border border-border bg-background">
              <span aria-hidden="true" className="h-5 w-5 rounded-full bg-surface-2" />
            </span>
          </span>
        </>
      );
  }
}

export function RawMaterialCard({ kind, tag, title, value, image }: RawMaterialItem) {
  return (
    <SpotlightCard className="group h-full overflow-hidden p-2.5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[var(--transition-slow)] ease-[var(--ease-brand)] group-hover:scale-[1.04]"
        />
        {/* Velo: porta il fondo dell'immagine al colore della pagina, così i
            badge restano leggibili su qualunque scatto. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-gradient-to-t from-background/90 via-background/40 to-transparent"
        />

        <Preview kind={kind} />

        <span
          className={cn(
            BADGE,
            "absolute left-2 z-10 transition-colors duration-[var(--transition-base)] group-hover:border-accent/60",
            // Le barre dei segmenti occupano il bordo alto della storia.
            kind === "stories" ? "top-5" : "top-2",
          )}
        >
          {tag}
        </span>

        {/* Riga del profilo: avatar e handle, come su un post vero. */}
        <span className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="grid h-5 w-5 place-items-center rounded-full border border-accent/50 bg-background/70 backdrop-blur-sm"
          >
            <BretiaSymbol className="h-2.5 w-auto" />
          </span>
          <span className="font-display text-[0.625rem] tracking-[0.08em] text-foreground/90">
            @iltuolocale
          </span>
        </span>
      </div>

      <p className="mt-3 px-1.5 text-sm leading-snug text-foreground/90">{title}</p>
      <p className="mt-1.5 px-1.5 pb-1.5 text-xs leading-relaxed text-muted-foreground">{value}</p>
    </SpotlightCard>
  );
}
