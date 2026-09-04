import { useEffect, useState } from "react";
import { useShouldAnimate } from "@/hooks/use-should-animate";
import { cn } from "@/lib/utils";

/**
 * Ritardi della sequenza, in millisecondi.
 *
 * L'ordine racconta il cross-sell: prima si disegna il nodo social (chi
 * intercetta), poi il ponte, poi il nodo sito (chi approfondisce). Solo a
 * ponte concluso partono gli impulsi, che sono l'unica animazione infinita.
 *
 * `pulse` deve restare >= `site + siteStep * 3`: un impulso che parte prima
 * che il nodo di arrivo esista viaggia verso il vuoto.
 */
const T = {
  social: 0,
  socialStep: 120,
  rail: 620,
  site: 900,
  siteStep: 120,
  label: 1500,
  pulse: 1700,
  /** Sfasamento del secondo impulso: i due non si incrociano al centro. */
  pulseOffset: 1400,
} as const;

/** Coordinate del ponte nel viewBox 360×240 — vedi `smm-bridge-send` in styles.css. */
const RAIL = { from: 128, to: 208, top: 104, bottom: 146 } as const;

/**
 * I due canali e il ponte fra loro.
 *
 * Tre nodi, letti da sinistra a destra:
 *
 * 1. **Nodo social** — telefono con un feed. Si disegna per primo con
 *    `.method-draw`: è il canale che intercetta.
 * 2. **Ponte** — due binari tratteggiati. Quello alto porta dai social al
 *    sito (scoperta), quello basso torna indietro (il sito alimenta i
 *    contenuti). Sono statici: il movimento è tutto negli impulsi.
 * 3. **Nodo sito** — finestra di browser. Si disegna per ultimo, con i
 *    `.method-dot` che si accendono sulle azioni concrete (menu, prenota).
 *
 * Gli impulsi (`.smm-bridge-pulse`) sono gli unici elementi in loop: si
 * fermano via `is-paused` quando la sezione esce dallo schermo, come il
 * fascio di `MetricsFilter` e lo spinner di `ServiceShowcase`.
 */
function BridgeVisual({ active, running }: { active: boolean; running: boolean }) {
  // Accento del tratto: `--bretia-blue-bright` (via `--color-accent`) rende
  // 3,54:1 sul fondo — sopra il 3:1 che WCAG 1.4.11 chiede agli elementi
  // grafici, sotto il 4,5:1 richiesto ai testi. Qui è tratto, non testo.
  const stroke = "var(--color-accent)";
  const faint = "var(--color-border-strong)";

  return (
    <svg viewBox="0 0 360 240" aria-hidden="true" fill="none" className="h-full w-full">
      {/* ---- Nodo 1: i social ---- */}
      <g className={cn("method-draw", active && "is-active")}>
        <rect
          x="26"
          y="42"
          width="86"
          height="156"
          rx="14"
          stroke={faint}
          strokeWidth="1.2"
          pathLength={1}
          style={{ animationDelay: `${T.social}ms` }}
        />
        <path
          d="M58 54 H80"
          stroke={faint}
          strokeWidth="1.2"
          strokeLinecap="round"
          pathLength={1}
          style={{ animationDelay: `${T.social + T.socialStep}ms` }}
        />
        {/* Il post in evidenza: il contenuto che racconta. */}
        <rect
          x="40"
          y="70"
          width="58"
          height="44"
          rx="6"
          stroke={stroke}
          strokeWidth="1.2"
          pathLength={1}
          style={{ animationDelay: `${T.social + T.socialStep * 2}ms` }}
        />
        <path
          d="M40 128 H98 M40 142 H84 M40 156 H92"
          stroke={faint}
          strokeWidth="1.2"
          strokeLinecap="round"
          pathLength={1}
          style={{ animationDelay: `${T.social + T.socialStep * 3}ms` }}
        />
        <circle
          cx="46"
          cy="176"
          r="2.5"
          fill={stroke}
          className="method-dot"
          style={{ animationDelay: `${T.social + T.socialStep * 4}ms` }}
        />
      </g>

      {/* ---- Nodo 2: il ponte ---- */}
      <g className={cn("method-draw", active && "is-active")}>
        <path
          d={`M${RAIL.from} ${RAIL.top} H${RAIL.to}`}
          stroke={faint}
          strokeWidth="1.2"
          strokeDasharray="3 5"
          pathLength={1}
          style={{ animationDelay: `${T.rail}ms` }}
        />
        <path
          d={`M${RAIL.from} ${RAIL.bottom} H${RAIL.to}`}
          stroke={faint}
          strokeWidth="1.2"
          strokeDasharray="3 5"
          pathLength={1}
          style={{ animationDelay: `${T.rail + 120}ms` }}
        />
      </g>

      {/* ---- Nodo 3: il sito ---- */}
      <g className={cn("method-draw", active && "is-active")}>
        <rect
          x="222"
          y="56"
          width="112"
          height="128"
          rx="10"
          stroke={faint}
          strokeWidth="1.2"
          pathLength={1}
          style={{ animationDelay: `${T.site}ms` }}
        />
        <path
          d={`M222 76 H334`}
          stroke={faint}
          strokeWidth="1.2"
          pathLength={1}
          style={{ animationDelay: `${T.site + T.siteStep}ms` }}
        />
        <path
          d="M236 94 H320 M236 108 H298"
          stroke={faint}
          strokeWidth="1.2"
          strokeLinecap="round"
          pathLength={1}
          style={{ animationDelay: `${T.site + T.siteStep * 2}ms` }}
        />
        {/* Le due azioni concrete: è qui che la curiosità diventa scelta. */}
        <rect
          x="236"
          y="126"
          width="46"
          height="18"
          rx="5"
          stroke={stroke}
          strokeWidth="1.2"
          pathLength={1}
          style={{ animationDelay: `${T.site + T.siteStep * 3}ms` }}
        />
        <rect
          x="236"
          y="152"
          width="66"
          height="18"
          rx="5"
          stroke={faint}
          strokeWidth="1.2"
          pathLength={1}
          style={{ animationDelay: `${T.site + T.siteStep * 4}ms` }}
        />
        <circle cx="230" cy="66" r="2" fill={faint} />
        <circle cx="238" cy="66" r="2" fill={faint} />
      </g>

      {/* ---- Impulsi sul ponte ---- */}
      {active && (
        <>
          <circle
            cx={RAIL.from}
            cy={RAIL.top}
            r="3.5"
            fill={stroke}
            className={cn("smm-bridge-pulse", !running && "is-paused")}
            style={{ animationDelay: `${T.pulse}ms` }}
          />
          {/* Stesso keyframe, direzione invertita: il ritorno non ha bisogno
              di una seconda animazione. */}
          <circle
            cx={RAIL.from}
            cy={RAIL.bottom}
            r="3.5"
            fill={faint}
            className={cn("smm-bridge-pulse is-back", !running && "is-paused")}
            style={{ animationDelay: `${T.pulse + T.pulseOffset}ms` }}
          />
        </>
      )}

      {/* ---- Etichette dei binari ---- */}
      <g
        className={cn("smm-fade-item", active && "is-in")}
        style={{ animationDelay: `${T.label}ms` }}
      >
        <text
          x="168"
          y="92"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          fontSize="9"
          letterSpacing="1.6"
        >
          SCOPERTA
        </text>
        <text
          x="168"
          y="168"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          fontSize="9"
          letterSpacing="1.6"
        >
          RITORNO
        </text>
      </g>
    </svg>
  );
}

/**
 * Il ponte fra i due canali: i social intercettano, il sito converte.
 *
 * Stesso schema di `FocusShift`: latch sul primo affaccio per la sequenza
 * d'entrata (parte una volta e resta), `shouldAnimate` vivo per il loop
 * degli impulsi.
 */
export function ChannelBridge() {
  const { ref: stageRef, shouldAnimate } = useShouldAnimate<HTMLDivElement>();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setEntered(true);
  }, [shouldAnimate]);

  return (
    <div ref={stageRef} className="mx-auto w-full max-w-[36rem]">
      <div
        role="img"
        aria-label="Un telefono con un post e una finestra di browser collegati da due binari: un impulso va dai social al sito, un altro torna indietro."
        className={cn("smm-card surface-card relative w-full p-4 sm:p-5", entered && "is-in")}
      >
        <div className="aspect-[3/2] w-full">
          <BridgeVisual active={entered} running={shouldAnimate} />
        </div>
      </div>

      <ul className="mt-8 flex list-none flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8">
        {["I SOCIAL", "IL PONTE", "IL SITO"].map((label, i) => (
          <li
            key={label}
            className={cn("smm-fade-item label-eyebrow", entered && "is-in")}
            style={{ animationDelay: `${T.label + i * 140}ms` }}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
