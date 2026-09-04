import { useEffect, useState } from "react";
import { useShouldAnimate } from "@/hooks/use-should-animate";
import { cn } from "@/lib/utils";

/**
 * Righe messe a fuoco dal mirino, nell'ordine in cui le visita.
 *
 * I tracciati sono tutti disegnati attorno al centro (176, 120): la riga
 * viene poi traslata al suo posto dal `<g>` che la contiene. Così le tre
 * icone condividono le stesse coordinate e restano allineate senza dover
 * ricalcolare ogni `d` a mano.
 */
type Row = {
  key: string;
  /** Tracciati del pittogramma, disegnati in cascata nell'ordine dato. */
  paths: string[];
  /** Centro verticale della riga nel viewBox. */
  cy: number;
  /** Cerchio tratteggiato attorno al glifo — solo il timbro di identità. */
  stamp?: boolean;
};

const ROWS: Row[] = [
  {
    key: "insegna",
    // Insegna / facciata del locale.
    paths: ["M162 116 L176 106 L190 116", "M166 116 V134 H186 V116", "M172 134 V125 H180 V134"],
    cy: 56,
  },
  {
    key: "prodotto",
    // Tazza: il prodotto, il dettaglio artigianale.
    paths: [
      "M166 118 H184 V126 C184 131 180 134 175 134 C170 134 166 131 166 126 Z",
      "M184 121 C190 121 190 128 184 128",
      "M171 114 C173 111 169 110 171 107",
      "M179 114 C181 111 177 110 179 107",
    ],
    cy: 122,
  },
  {
    key: "identita",
    // Timbro con stella: atmosfera e identità.
    paths: [
      "M176 112 L177.9 117.3 L183.6 117.5 L179.1 121 L180.7 126.5 L176 123.3 L171.3 126.5 L172.9 121 L168.4 117.5 L174.1 117.3 Z",
    ],
    stamp: true,
    cy: 188,
  },
];

/**
 * Ritardi della sequenza, in millisecondi.
 *
 * `shift` e `row` non sono indipendenti: le righe compaiono poco prima che
 * il mirino ci arrivi sopra, altrimenti il mirino inquadrerebbe il vuoto.
 * Gli spostamenti del mirino vivono in `@keyframes smm-focus-shift`
 * (styles.css): se cambi `shift`/`rowStep` qui, ricontrolla anche lì.
 */
const T = {
  frame: 0,
  frameStep: 110,
  reticle: 350,
  shift: 1300,
  row: 2080,
  rowStep: 840,
  rowDraw: 90,
  rowDrawStep: 110,
  rowDot: 520,
  settle: 4300,
} as const;

/**
 * Un mirino fotografico che lascia la persona e va a inquadrare l'attività.
 *
 * Stesso linguaggio di `GrowthVisual` e delle illustrazioni del Metodo:
 * pittogramma, non illustrazione — tratti puliti, `.method-draw` per il
 * disegno progressivo, `.method-dot` per i nodi che si accendono.
 */
function FocusVisual({ active, spinning }: { active: boolean; spinning: boolean }) {
  const stroke = "var(--color-primary)";
  const faint = "var(--color-border-strong)";

  return (
    <svg viewBox="0 0 360 240" aria-hidden="true" fill="none" className="h-full w-full">
      {/* Mirino: i quattro angoli dell'inquadratura si disegnano per primi. */}
      <g className={cn("method-draw", active && "is-active")}>
        {["M14 40 V14 H40", "M320 14 H346 V40", "M346 200 V226 H320", "M40 226 H14 V200"].map(
          (d, i) => (
            <path
              key={d}
              d={d}
              stroke={faint}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              style={{ animationDelay: `${T.frame + i * T.frameStep}ms` }}
            />
          ),
        )}
      </g>

      {/* Tacche di centratura e linea che separa la persona dall'attività. */}
      <path
        d="M180 14 V21 M180 219 V226 M14 120 H21 M339 120 H346"
        stroke={faint}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M126 44 V196" stroke={faint} strokeWidth="1" strokeDasharray="3 5" />

      {/* Il "creator": persona davanti allo smartphone. Parte a fuoco e ci
          esce — non sparisce, smette solo di essere il soggetto. */}
      <g className={cn("smm-focus-subject", active && "is-in")}>
        <rect x="56" y="76" width="44" height="88" rx="7" stroke={faint} strokeWidth="1.2" />
        <path d="M70 84 H86" stroke={faint} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="78" cy="112" r="9" stroke={stroke} strokeWidth="1.2" />
        <path
          d="M62 148 C 65 130, 91 130, 94 148"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>

      {/* I tre elementi concreti dell'attività. */}
      {ROWS.map((row, i) => {
        const enter = T.row + i * T.rowStep;
        return (
          <g key={row.key} transform={`translate(0 ${row.cy - 120})`}>
            <g
              className={cn("smm-fade-item", active && "is-in")}
              style={{ animationDelay: `${enter}ms` }}
            >
              <g className={cn("method-draw", active && "is-active")}>
                <rect
                  x="152"
                  y="96"
                  width="48"
                  height="48"
                  rx="10"
                  stroke={faint}
                  strokeWidth="1.2"
                  pathLength={1}
                  style={{ animationDelay: `${enter + T.rowDraw}ms` }}
                />
                {/* Il timbro è tratteggiato: `.method-draw` disegna azzerando
                    `stroke-dasharray`, quindi questo cerchio resta fuori dal
                    disegno progressivo e compare con la dissolvenza. */}
                {row.stamp ? (
                  <circle
                    cx="176"
                    cy="120"
                    r="13"
                    stroke={faint}
                    strokeWidth="1.2"
                    strokeDasharray="2 4"
                  />
                ) : null}
                {row.paths.map((d, j) => (
                  <path
                    key={d}
                    d={d}
                    stroke={stroke}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    style={{
                      animationDelay: `${enter + T.rowDraw + (j + 1) * T.rowDrawStep}ms`,
                    }}
                  />
                ))}
                <path
                  d="M212 111 H316"
                  stroke={faint}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  pathLength={1}
                  style={{ animationDelay: `${enter + T.rowDraw + 120}ms` }}
                />
                <path
                  d="M212 129 H286"
                  stroke={faint}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  pathLength={1}
                  style={{ animationDelay: `${enter + T.rowDraw + 240}ms` }}
                />
                {/* Il nodo dell'ultima riga è disegnato fuori da qui: è quello
                    che resta a pulsare a sequenza conclusa. */}
                {row.stamp ? null : (
                  <circle
                    cx="330"
                    cy="111"
                    r="2.5"
                    fill={stroke}
                    className="method-dot"
                    style={{ animationDelay: `${enter + T.rowDot}ms` }}
                  />
                )}
              </g>
            </g>
          </g>
        );
      })}

      {/* Nodo finale: pulsa in continuo a sequenza conclusa, in un elemento
          separato dalla dissolvenza per non farle competere sulla stessa
          proprietà `animation`. Stesso schema di `GrowthVisual`. */}
      {active && (
        <g className="smm-fade-item is-in" style={{ animationDelay: `${T.settle}ms` }}>
          <circle
            cx="330"
            cy="179"
            r="6"
            fill={stroke}
            fillOpacity="0.35"
            className={cn("chart-ping-dot", spinning && "animate-ping")}
          />
          <circle cx="330" cy="179" r="2.5" fill={stroke} />
        </g>
      )}

      {/* Il reticolo: si disegna sopra la persona, poi cammina sui tre
          elementi dell'attività e resta sull'ultimo. */}
      <g className={cn("smm-focus-reticle", active && "is-in")}>
        <g className={cn("method-draw", active && "is-active")}>
          {["M50 98 V84 H64", "M92 84 H106 V98", "M106 126 V140 H92", "M64 140 H50 V126"].map(
            (d, i) => (
              <path
                key={d}
                d={d}
                stroke={stroke}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                style={{ animationDelay: `${T.reticle + i * 70}ms` }}
              />
            ),
          )}
        </g>
      </g>
    </svg>
  );
}

export function FocusShift() {
  const { ref: stageRef, shouldAnimate } = useShouldAnimate<HTMLDivElement>();
  const [entered, setEntered] = useState(false);

  // Latch: parte una volta sola al primo affaccio, non torna più indietro.
  useEffect(() => {
    if (shouldAnimate) setEntered(true);
  }, [shouldAnimate]);

  const active = entered;

  return (
    <div ref={stageRef} className="mx-auto w-full max-w-[36rem]">
      <div
        role="img"
        aria-label="Un mirino fotografico lascia l'inquadratura della persona e mette a fuoco tre elementi dell'attività: l'insegna del locale, il prodotto e il timbro di identità."
        className={cn("smm-card surface-card relative w-full p-4 sm:p-5", active && "is-in")}
      >
        <div className="aspect-[3/2] w-full">
          <FocusVisual active={active} spinning={shouldAnimate} />
        </div>
      </div>

      <ul className="mt-8 flex list-none flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8">
        {["IL LOCALE", "I PRODOTTI", "I DETTAGLI"].map((label, i) => (
          <li
            key={label}
            className={cn("smm-fade-item label-eyebrow", active && "is-in")}
            style={{ animationDelay: `${T.row + i * T.rowStep}ms` }}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
