import { useEffect, useState } from "react";
import { ArrowRight, Boxes, Feather, Lock, ShieldCheck, Zap } from "lucide-react";
import { useShouldAnimate } from "@/hooks/use-should-animate";
import { cn } from "@/lib/utils";

/**
 * L'accento vivo del marchio. Qui fa da SUPERFICIE decorativa — pastiglie,
 * barre, alone, sottolineatura della scheda attiva — mai da testo: come
 * documenta il token in `styles.css`, `--bretia-blue-bright` non regge il
 * 4.5:1 di WCAG 1.4.3. Le cifre restano quindi su `text-brand`.
 */
const ACCENT = "var(--bretia-blue-bright)";

/**
 * Core Web Vitals del motore. `fill` è la quota di barra riempita rispetto
 * alla soglia "buona" di Google (LCP 2.5s, FID 100ms, CLS 0.1): più la
 * metrica è distante dalla soglia, più la barra è piena.
 */
const VITALS = [
  { label: "LCP", value: "0.6s", fill: "94%" },
  { label: "FID", value: "12ms", fill: "88%" },
  { label: "CLS", value: "0", fill: "100%" },
];

const SECURITY = [
  { icon: ShieldCheck, label: "SSL" },
  { icon: Zap, label: "EDGE" },
];

const TABS = ["VITALS", "SICUREZZA"];

/** Voci di menu della pagina in anteprima. */
const NAV = ["HOME", "SERVIZI", "CONTATTI"];

/** Le tre mini-card della pagina: ognuna con un andamento disegnato diverso. */
const PREVIEW_STATS = [
  { kind: "line", value: "+64%", label: "TRAFFICO" },
  { kind: "bars", value: "+28%", label: "CONTATTI" },
  { kind: "area", value: "+41%", label: "VENDITE" },
] as const;

/**
 * Micro-grafica di una mini-card. Il viewBox è deliberatamente sformato
 * (`preserveAspectRatio="none"`) per riempire card di larghezze diverse; i
 * tratti restano di spessore costante grazie a `vector-effect`, che li tiene
 * fuori dalla trasformazione.
 */
function StatSpark({ kind }: { kind: (typeof PREVIEW_STATS)[number]["kind"] }) {
  const faint = "var(--color-border-strong)";

  return (
    <svg
      viewBox="0 0 44 16"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-4 w-full"
    >
      {kind === "line" && (
        <polyline
          points="1,13 10,10 19,11 28,6 36,7 43,2"
          stroke={ACCENT}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      )}

      {kind === "bars" && (
        <g>
          <rect x="1" y="10" width="6" height="6" fill={faint} />
          <rect x="10" y="8" width="6" height="8" fill={faint} />
          <rect x="19" y="9" width="6" height="7" fill={faint} />
          <rect x="28" y="5" width="6" height="11" fill={ACCENT} />
          <rect x="37" y="2" width="6" height="14" fill={ACCENT} />
        </g>
      )}

      {kind === "area" && (
        <g>
          <path
            d="M1 14 L10 11 L19 12 L28 6 L36 8 L43 3 V16 H1 Z"
            fill={ACCENT}
            fillOpacity="0.22"
          />
          <path
            d="M1 14 L10 11 L19 12 L28 6 L36 8 L43 3"
            stroke={ACCENT}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      )}
    </svg>
  );
}

/**
 * Blueprint del motore proprietario, non il sito finito di un cliente:
 * finestra del browser sull'ambiente di anteprima, layout neutro a sinistra
 * e pannello tecnico a schede a destra. L'asimmetria 4/3 è voluta — la
 * pagina è il prodotto, la telemetria è il servizio che la tiene in piedi.
 *
 * Come le altre illustrazioni del sito l'entrata in scena scatta una volta
 * sola al primo affaccio (`entered`), mentre l'unico movimento continuo — il
 * punto dell'indicatore LIVE — si ferma quando il blueprint esce dal
 * viewport o la scheda va in secondo piano (`shouldAnimate`).
 */
export function SiteMockup() {
  const { ref, shouldAnimate } = useShouldAnimate<HTMLDivElement>();
  const [entered, setEntered] = useState(false);

  // Latch: legare l'entrata a `shouldAnimate` farebbe risvanire il blueprint
  // ogni volta che esce di scena.
  useEffect(() => {
    if (shouldAnimate) setEntered(true);
  }, [shouldAnimate]);

  return (
    <div ref={ref} className="relative isolate w-full">
      {/* Alone diffuso: stacca la finestra dal fondo scuro dando profondità,
          senza aggiungere un altro bordo. `isolate` sul contenitore tiene lo
          strato negativo dentro questo stacking context, quindi l'alone non
          scivola sotto lo sfondo della sezione.

          Il riquadro resta a `inset-0`: a diffondere l'alone oltre i bordi è
          solo la sfocatura, che dilata il dipinto ma non l'area scrollabile.
          Un riquadro più grande della card sfonderebbe invece il padding del
          container e aggiungerebbe scroll orizzontale alla pagina. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 rounded-[3rem] blur-3xl transition-opacity duration-[var(--transition-slow)] ease-[var(--ease-brand)]",
          entered ? "opacity-100" : "opacity-0",
        )}
        style={{
          background: `radial-gradient(62% 62% at 50% 45%, color-mix(in oklab, ${ACCENT} 38%, transparent), transparent 74%)`,
        }}
      />

      <div
        role="img"
        aria-label="Blueprint del motore proprietario BRETÌA aperto nel browser su preview.bretia.studio/live-engine: anteprima di un layout neutro accanto a un pannello tecnico con i Core Web Vitals — LCP 0,6 secondi, FID 12 millisecondi, CLS 0 — i tag SSL ed Edge e l'indicatore di architettura headless a zero bloatware."
        className={cn("smm-card surface-card w-full overflow-hidden", entered && "is-in")}
        style={{
          boxShadow: `0 32px 64px -34px color-mix(in oklab, ${ACCENT} 55%, transparent)`,
        }}
      >
        {/* Cornice del browser */}
        <div className="flex items-center gap-2.5 border-b border-border bg-surface-2/70 px-3.5 py-2.5">
          <span className="flex shrink-0 gap-1.5">
            <span className="h-2 w-2 rounded-full bg-border-strong" />
            <span className="h-2 w-2 rounded-full bg-border-strong" />
            <span className="h-2 w-2 rounded-full bg-border-strong" />
          </span>
          <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-border bg-background/70 px-2.5 py-1">
            <Lock size={9} strokeWidth={2} className="shrink-0 text-brand" />
            <span className="truncate text-[10px] tracking-wide text-muted-foreground">
              preview.bretia.studio/live-engine
            </span>
          </span>
        </div>

        {/* L'ambiente di anteprima */}
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--gradient-veil)" }}
          />

          <div className="relative flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
            {/* Intestazione del motore */}
            <div className="flex items-center gap-2">
              <span
                className="grid h-5 w-5 place-items-center rounded-[6px] font-display text-[9px] font-semibold"
                style={{ background: ACCENT, color: "var(--primary-foreground)" }}
              >
                B
              </span>
              <span className="font-display text-[11px] font-semibold tracking-[0.14em]">
                LIVE ENGINE
              </span>
              <span className="ml-auto rounded-full border border-border px-2 py-0.5 text-[8px] tracking-[0.14em] text-muted-foreground">
                BLUEPRINT
              </span>
            </div>

            {/* Il taglio asimmetrico: 4 colonne alla pagina, 3 alla telemetria.
                Il caso più stretto è il viewport a 1024px, dove il mockup vale
                5/12 del container: lì al pannello restano ~130px, quanto basta
                alle due schede. Sotto `sm` i due riquadri si impilano —
                affiancati a quella larghezza non ci starebbe nulla. */}
            <div className="grid gap-3 sm:grid-cols-7">
              {/* Anteprima del layout: una pagina vera in miniatura, senza
                  marchio. È il contenitore che il motore serve, non il sito
                  di un cliente specifico. */}
              <div className="rounded-xl border border-border bg-background/55 p-3.5 sm:col-span-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 shrink-0 rounded-[4px]" style={{ background: ACCENT }} />
                  <span className="ml-auto flex gap-2 text-[6.5px] tracking-[0.06em] text-muted-foreground">
                    {NAV.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </span>
                </div>

                <p className="mt-4 font-display text-[11px] font-semibold leading-[1.25]">
                  Veloce da caricare.
                  <br />
                  Facile da trovare.
                </p>
                <p className="mt-1.5 text-[7px] leading-relaxed text-muted-foreground">
                  Ogni pagina servita dall'edge, in meno di un secondo.
                </p>

                <span
                  className="mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[7.5px] font-semibold tracking-[0.08em]"
                  style={{ background: ACCENT, color: "var(--primary-foreground)" }}
                >
                  INIZIA ORA
                  <ArrowRight size={8} strokeWidth={2.5} className="shrink-0" />
                </span>

                <div className="mt-4 grid grid-cols-3 gap-1.5">
                  {PREVIEW_STATS.map((stat) => (
                    <span
                      key={stat.label}
                      className="flex flex-col rounded-md border border-border bg-surface-2/60 p-1.5"
                    >
                      <StatSpark kind={stat.kind} />
                      <span className="mt-1.5 block font-display text-[10px] font-semibold leading-none text-brand">
                        {stat.value}
                      </span>
                      <span className="mt-1 block truncate text-[6.5px] leading-none text-muted-foreground">
                        {stat.label}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Pannello tecnico: fondo più scuro della pagina che misura,
                  così si legge come strumento e non come contenuto. */}
              <div className="rounded-xl border border-border bg-background/85 p-2.5 sm:col-span-3">
                <div className="flex items-center gap-3 border-b border-border">
                  {TABS.map((tab, i) => (
                    <span
                      key={tab}
                      className={cn(
                        "-mb-px border-b-2 pb-2 text-[8px] tracking-[0.12em]",
                        i === 0 ? "text-foreground" : "border-transparent text-muted-foreground/70",
                      )}
                      style={i === 0 ? { borderColor: ACCENT } : undefined}
                    >
                      {tab}
                    </span>
                  ))}
                </div>

                <ul className="mt-3 flex list-none flex-col gap-2.5">
                  {VITALS.map((vital, i) => (
                    <li
                      key={vital.label}
                      className={cn("smm-fade-item", entered && "is-in")}
                      style={{ animationDelay: `${340 + i * 110}ms` }}
                    >
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-[8px] tracking-[0.14em] text-muted-foreground">
                          {vital.label}
                        </span>
                        <span className="font-display text-[11px] font-semibold leading-none text-brand">
                          {vital.value}
                        </span>
                      </span>
                      <span className="mt-1.5 block h-[3px] w-full overflow-hidden rounded-full bg-border">
                        <span
                          className="block h-full rounded-full"
                          style={{ width: vital.fill, background: ACCENT }}
                        />
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-1 border-t border-border pt-3">
                  {SECURITY.map((tag) => (
                    <span
                      key={tag.label}
                      className="flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[7.5px] tracking-[0.1em] text-brand"
                      style={{
                        borderColor: `color-mix(in oklab, ${ACCENT} 40%, transparent)`,
                        background: `color-mix(in oklab, ${ACCENT} 10%, transparent)`,
                      }}
                    >
                      <tag.icon size={8} strokeWidth={2} className="shrink-0" />
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Architettura: la riga che dice di cosa è fatto il motore */}
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-2/50 px-3 py-2">
              <Boxes size={12} strokeWidth={1.5} className="shrink-0 text-brand" />
              <span className="truncate text-[8px] tracking-[0.12em] text-muted-foreground">
                HEADLESS
              </span>
              <Feather size={12} strokeWidth={1.5} className="shrink-0 text-brand" />
              <span className="truncate text-[8px] tracking-[0.12em] text-muted-foreground">
                ZERO BLOATWARE
              </span>
              <span className="ml-auto flex shrink-0 items-center gap-1.5">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span
                    className={cn("absolute h-2 w-2 rounded-full", shouldAnimate && "animate-ping")}
                    style={{ background: `color-mix(in oklab, ${ACCENT} 55%, transparent)` }}
                  />
                  <span
                    className="relative h-1.5 w-1.5 rounded-full"
                    style={{ background: ACCENT }}
                  />
                </span>
                <span className="text-[8px] tracking-[0.12em] text-brand">LIVE</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
