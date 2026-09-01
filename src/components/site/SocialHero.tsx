import { useEffect, useRef, useState } from "react";
import { useShouldAnimate } from "@/hooks/use-should-animate";
import { cn } from "@/lib/utils";

import phoneSrc from "@/assets/social/phone.webp";
import cardGrowthSrc from "@/assets/social/card-growth.webp";
import cardEngagementSrc from "@/assets/social/card-engagement.webp";
import cardAnalyticsSrc from "@/assets/social/card-analytics.webp";
import iconInstagramSrc from "@/assets/social/icon-instagram.webp";
import iconLinkedinSrc from "@/assets/social/icon-linkedin.webp";
import iconTiktokSrc from "@/assets/social/icon-tiktok.webp";
import iconYoutubeSrc from "@/assets/social/icon-youtube.webp";

/*
 * Il render sorgente era un unico PNG da 1,6 MB con tutta la composizione
 * stampata dentro. È stato affettato nei suoi otto oggetti (telefono, tre card,
 * quattro icone), esportati in WebP: 155 KB in tutto, e ogni pezzo può muoversi
 * per conto proprio. Le coordinate qui sotto sono percentuali sul canvas
 * originale 1536×1024, così la composizione resta fedele a ogni dimensione.
 */

/** Centro del telefono: da qui partono i satelliti e le linee di connessione. */
const PHONE_CENTER = { x: 50.358, y: 50.195 };

/** Rapporto del canvas: serve a leggere le percentuali X e Y nella stessa scala. */
const CANVAS_RATIO = 1536 / 1024;

/** Quanto lontano parte un satellite, in percentuale del proprio riquadro. */
const ARRIVE_DISTANCE = 118;

type Satellite = {
  name: string;
  src: string;
  /** Riquadro sul canvas originale, in percentuale. */
  left: number;
  top: number;
  width: number;
  height: number;
  /** Centro del riquadro: direzione d'entrata e ancoraggio della linea. */
  cx: number;
  cy: number;
  /** Dimensioni native del WebP: riservano lo spazio prima del decode. */
  w: number;
  h: number;
  /** Piano di profondità. `z` governa il parallasse 3D, `par` quello allo scroll. */
  z: number;
  par: number;
  /**
   * Oscillazione continua. L'ampiezza è in `cqw` — percentuale della larghezza
   * dello stage — non in px: deve restare proporzionale alla scena, altrimenti
   * l'angolo del filo (sotto) sarebbe corretto a una sola dimensione.
   */
  a: number;
  fr: number;
  fd: number;
  /** Tratto di connessione, in coordinate del canvas originale. */
  d: string;
  /**
   * Il filo non può traslare col satellite: un capo è inchiodato al telefono.
   * Ruota invece attorno a quel capo. `wr` è l'angolo che porta il capo libero
   * a salire esattamente di `a`: atan(ampiezza / distanza orizzontale), col
   * segno del lato. Essendo derivato da grandezze entrambe in unità di canvas,
   * resta valido a ogni dimensione dello stage.
   */
  wr: number;
  /** Perno della rotazione: il punto in cui il filo entra nel telefono. */
  wox: number;
  woy: number;
};

/*
 * L'ordine è quello con cui i satelliti entrano in scena: dall'alto verso il
 * basso, alternando i due lati del telefono. Le curve partono dalla sagoma
 * reale del telefono (misurata sul canale alpha del render) e arrivano al bordo
 * del satellite.
 */
const SATELLITES: Satellite[] = [
  {
    name: "icon-instagram",
    src: iconInstagramSrc,
    left: 78.581,
    top: 13.379,
    width: 10.547,
    height: 15.625,
    cx: 83.854,
    cy: 21.191,
    w: 162,
    h: 160,
    z: -46,
    par: 1,
    a: 1.562,
    fr: 0.7,
    fd: 5.1,
    d: "M1035 217 C1115.1 203.8, 1158.1 207.9, 1245 217",
    wr: -6.52,
    wox: 1035,
    woy: 217,
  },
  {
    name: "card-growth",
    src: cardGrowthSrc,
    left: 13.281,
    top: 12.305,
    width: 16.797,
    height: 27.246,
    cx: 21.68,
    cy: 25.928,
    w: 258,
    h: 279,
    z: 34,
    par: 0.95,
    a: 1.406,
    fr: 0.6,
    fd: 5.6,
    d: "M673 265.5 C574.5 251.9, 516.1 256, 424 265.5",
    wr: 4.96,
    wox: 673,
    woy: 265.5,
  },
  {
    name: "icon-linkedin",
    src: iconLinkedinSrc,
    left: 80.078,
    top: 30.762,
    width: 10.742,
    height: 15.82,
    cx: 85.449,
    cy: 38.672,
    w: 165,
    h: 162,
    z: -46,
    par: 1,
    a: 1.25,
    fr: 0.55,
    fd: 6.6,
    d: "M985 396 C1087.5 384, 1167.4 388.1, 1268 396",
    wr: -3.88,
    wox: 985,
    woy: 396,
  },
  {
    name: "card-engagement",
    src: cardEngagementSrc,
    left: 12.891,
    top: 46.68,
    width: 8.464,
    height: 12.402,
    cx: 17.122,
    cy: 52.881,
    w: 130,
    h: 127,
    z: 34,
    par: 0.95,
    a: 1.719,
    fr: 0.8,
    fd: 4.6,
    d: "M576.1 541.5 C466.9 553, 387.1 547.8, 290 541.5",
    wr: 5.27,
    wox: 576.1,
    woy: 541.5,
  },
  {
    name: "icon-tiktok",
    src: iconTiktokSrc,
    left: 78.711,
    top: 49.512,
    width: 10.872,
    height: 16.504,
    cx: 84.147,
    cy: 57.764,
    w: 167,
    h: 169,
    z: -46,
    par: 1,
    a: 1.719,
    fr: 0.75,
    fd: 4.9,
    d: "M929.1 591.5 C1047.6 604.2, 1129 599, 1247 591.5",
    wr: -4.75,
    wox: 929.1,
    woy: 591.5,
  },
  {
    name: "card-analytics",
    src: cardAnalyticsSrc,
    left: 8.073,
    top: 64.746,
    width: 14.258,
    height: 15.527,
    cx: 15.202,
    cy: 72.51,
    w: 219,
    h: 159,
    z: 34,
    par: 0.95,
    a: 1.25,
    fr: 0.5,
    fd: 6.2,
    d: "M518.9 742.5 C436.2 753.7, 384 749.6, 305 742.5",
    wr: 5.13,
    wox: 518.9,
    woy: 742.5,
  },
  {
    name: "icon-youtube",
    src: iconYoutubeSrc,
    left: 78.646,
    top: 69.238,
    width: 9.831,
    height: 15.039,
    cx: 83.561,
    cy: 76.758,
    w: 151,
    h: 154,
    z: -46,
    par: 1,
    a: 1.406,
    fr: 0.6,
    fd: 5.9,
    d: "M873 786 C1001.5 803.8, 1113.6 798.7, 1246 786",
    wr: -3.31,
    wox: 873,
    woy: 786,
  },
];

const LABELS = ["STRATEGIA", "CONTENUTI", "GESTIONE", "ANALISI"];

/* Ritardi che dipendono dall'indice, in millisecondi: solo questi stanno qui.
   Bloom, telefono e passata di luce non variano per elemento e vivono nel CSS,
   accanto alle rispettive animazioni. Totale dell'entrata: ~2,0s. */
const T = {
  line: 520,
  lineStep: 60,
  satellite: 1000,
  satelliteStep: 60,
  label: 1250,
  labelStep: 80,
} as const;

/** Inclinazione massima della scena sotto il puntatore. */
const TILT_Y = 5;
const TILT_X = 3.5;
/** Escursione del parallasse allo scroll, in px, prima del moltiplicatore. */
const SCROLL_RANGE = 20;

/**
 * Direzione d'entrata di un satellite: parte compresso verso il telefono e
 * scatta al proprio posto. Le X percentuali del canvas valgono 1,5 volte le Y,
 * quindi la componente orizzontale va riscalata prima di normalizzare, altrimenti
 * i satelliti laterali entrerebbero con un angolo sbagliato.
 */
function arriveOffset(sat: Satellite) {
  const dx = (PHONE_CENTER.x - sat.cx) * CANVAS_RATIO;
  const dy = PHONE_CENTER.y - sat.cy;
  const len = Math.hypot(dx, dy) || 1;
  return {
    ax: `${((dx / len) * ARRIVE_DISTANCE).toFixed(1)}%`,
    ay: `${((dy / len) * ARRIVE_DISTANCE).toFixed(1)}%`,
  };
}

/**
 * Visual della hero Social Media Managing.
 *
 * Tre tipi di movimento, tenuti separati di proposito:
 *
 * 1. **Entrata** — una volta sola, all'ingresso in viewport. Molla smorzata vera
 *    (`--ease-spring`), non un finto overshoot.
 * 2. **Oscillazione** — continua. È l'unica cosa che gira all'infinito, ed è
 *    interamente CSS su `transform`: vive sul thread di composizione, non tocca
 *    il main thread. Fuori schermo o a scheda nascosta viene messa in pausa
 *    (`animation-play-state`) da `useShouldAnimate`.
 * 3. **Profondità** — parallasse allo scroll e inclinazione 3D al puntatore.
 *    Guidate dagli eventi, mai da un loop perenne: un solo `requestAnimationFrame`
 *    condiviso che si spegne da solo appena la scena si è assestata.
 */
export function SocialHero() {
  const { ref: stageRef, shouldAnimate } = useShouldAnimate<HTMLDivElement>();
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tilting, setTilting] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // L'entrata si aggancia allo stesso observer dell'oscillazione: è un latch,
  // non un secondo osservatore. Una volta partita non torna più indietro.
  useEffect(() => {
    if (shouldAnimate) setEntered(true);
  }, [shouldAnimate]);

  useEffect(() => {
    const stage = stageRef.current;
    const scene = sceneRef.current;
    // Niente ascoltatori se la scena non è a schermo, se l'utente ha chiesto meno
    // movimento, o se il puntatore è grossolano: su touch l'inclinazione non ha
    // sorgente e il parallasse allo scroll competerebbe con lo scroll stesso.
    if (!stage || !scene || !shouldAnimate || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let last = 0;
    // Correnti e obiettivi dell'inclinazione; `scroll` è invece un valore secco.
    let rx = 0;
    let ry = 0;
    let targetRx = 0;
    let targetRy = 0;
    let scrollPending = true;

    const applyScroll = () => {
      const rect = stage.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      // -1 quando la scena è in cima allo schermo, +1 quando è in fondo.
      const progress = Math.max(
        -1,
        Math.min(1, (center - window.innerHeight / 2) / window.innerHeight),
      );
      stage.style.setProperty("--smm-scroll", `${(progress * SCROLL_RANGE).toFixed(2)}px`);
    };

    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;

      if (scrollPending) {
        applyScroll();
        scrollPending = false;
      }

      // Smorzamento indipendente dal frame rate: a 120Hz deve assestarsi nello
      // stesso tempo che a 60Hz, non nella metà.
      const k = Math.min(1, dt * 11);
      rx += (targetRx - rx) * k;
      ry += (targetRy - ry) * k;
      scene.style.setProperty("--rx", `${rx.toFixed(3)}deg`);
      scene.style.setProperty("--ry", `${ry.toFixed(3)}deg`);

      const settled = Math.abs(targetRx - rx) < 0.01 && Math.abs(targetRy - ry) < 0.01;
      if (settled && !scrollPending) {
        // Lo smorzamento è asintotico: senza questo aggancio resterebbe per
        // sempre una frazione di grado di rotazione residua.
        rx = targetRx;
        ry = targetRy;
        scene.style.setProperty("--rx", `${rx}deg`);
        scene.style.setProperty("--ry", `${ry}deg`);
        // Il loop si spegne e restituisce il livello di composizione.
        // Riparte al prossimo evento.
        raf = 0;
        last = 0;
        setTilting(false);
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onScroll = () => {
      scrollPending = true;
      wake();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      targetRy = Math.max(-1, Math.min(1, nx * 2)) * TILT_Y;
      targetRx = Math.max(-1, Math.min(1, ny * 2)) * -TILT_X;
      setTilting(true);
      wake();
    };

    const onPointerLeave = () => {
      targetRx = 0;
      targetRy = 0;
      wake();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", onPointerLeave);
    wake();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      if (raf) cancelAnimationFrame(raf);
      // La scena resta dove l'ha lasciata l'ultimo frame: azzerarla qui
      // produrrebbe uno scatto ogni volta che si esce dal viewport.
      setTilting(false);
    };
  }, [shouldAnimate, reduced, stageRef]);

  const playing = entered && !reduced;

  return (
    <div
      ref={stageRef}
      className={cn(
        "smm-stage relative mx-auto w-full max-w-[40rem]",
        playing && "is-playing",
        reduced && "is-static",
        !shouldAnimate && "is-quiet",
        tilting && "is-tilting",
      )}
    >
      <div
        role="img"
        aria-label="Smartphone con il profilo social di un'attività gestito da BRETÌA, circondato dalle icone di Instagram, LinkedIn, TikTok e YouTube e da schede con andamento, interazioni e statistiche."
        className="smm-viewport relative w-full"
      >
        <div ref={sceneRef} className="smm-scene absolute inset-0">
          <span aria-hidden="true" className="smm-bloom" />

          {/* Rete di connessione. Nel render originale era stampata nel PNG:
              ridisegnata in SVG usa il blu di marca, si disegna all'entrata e
              segue i piani di profondità. */}
          {/* Il viewBox è il canvas del render: le curve restano allineate ai
              layer senza conversioni. Scala uniforme e nessun
              `non-scaling-stroke` — insieme a `pathLength` spostavano il calcolo
              del tratteggio nello spazio del dispositivo, e la linea finiva
              punteggiata invece che continua.

              La rete sta sul piano più arretrato: telefono, card e icone la
              coprono, quindi i due capi di ogni filo finiscono nascosti sotto
              ciò che collegano e non possono mai mostrare un distacco. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1536 1024"
            fill="none"
            className="smm-net smm-layer"
            style={
              {
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                "--z": "-46px",
                "--par": "1",
              } as React.CSSProperties
            }
          >
            <defs>
              {/* Il filamento si dissolve ai due estremi invece di terminare
                  di netto: legge come luce, non come tratto disegnato, e
                  assorbe lo scarto residuo del parallasse fra i piani. */}
              <linearGradient id="smm-wire-fade">
                <stop offset="0%" stopOpacity="0" />
                <stop offset="16%" stopOpacity="0.72" />
                <stop offset="84%" stopOpacity="0.72" />
                <stop offset="100%" stopOpacity="0" />
              </linearGradient>
            </defs>
            {SATELLITES.map((sat, i) => (
              <g
                key={sat.name}
                className="smm-wire"
                style={
                  {
                    transformBox: "view-box",
                    transformOrigin: `${sat.wox}px ${sat.woy}px`,
                    "--wr": `${sat.wr}deg`,
                    "--fd": `${sat.fd}s`,
                    // Stessa durata, stesso ritardo e stessa curva del satellite:
                    // se le due animazioni sfasassero anche di poco, il filo
                    // tornerebbe a staccarsi.
                    animationDelay: `${T.satellite + i * T.satelliteStep + 640}ms`,
                  } as React.CSSProperties
                }
              >
                <path
                  d={sat.d}
                  pathLength={1}
                  stroke="url(#smm-wire-fade)"
                  strokeWidth={4}
                  strokeLinecap="round"
                  style={{ animationDelay: `${T.line + i * T.lineStep}ms` }}
                />
              </g>
            ))}
          </svg>

          {/* Telefono: piano d'appoggio della scena, z = 0. */}
          <div
            aria-hidden="true"
            className="smm-layer smm-layer-phone"
            style={
              {
                left: "28.646%",
                top: "3.32%",
                width: "43.424%",
                height: "93.75%",
                "--z": "0px",
                "--par": "0.28",
              } as React.CSSProperties
            }
          >
            <div className="smm-in">
              <div
                className="smm-float"
                style={
                  { "--fy": "0.781cqw", "--fr": "0.25deg", "--fd": "7.2s" } as React.CSSProperties
                }
              >
                <img
                  src={phoneSrc}
                  alt=""
                  width={667}
                  height={960}
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-contain"
                />
                {/* Passata di luce sul vetro, mascherata sulla sagoma del
                    telefono: è il dettaglio che lo fa leggere come oggetto
                    reale e non come immagine incollata. Una volta sola. */}
                <span
                  className="smm-sweep"
                  style={{
                    WebkitMaskImage: `url(${phoneSrc})`,
                    maskImage: `url(${phoneSrc})`,
                  }}
                >
                  <span className="smm-sweep-bar" />
                </span>
              </div>
            </div>
          </div>

          {SATELLITES.map((sat, i) => {
            const { ax, ay } = arriveOffset(sat);
            return (
              <div
                key={sat.name}
                aria-hidden="true"
                className="smm-layer"
                style={
                  {
                    left: `${sat.left}%`,
                    top: `${sat.top}%`,
                    width: `${sat.width}%`,
                    height: `${sat.height}%`,
                    "--z": `${sat.z}px`,
                    "--par": `${sat.par}`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="smm-in"
                  style={
                    {
                      "--ax": ax,
                      "--ay": ay,
                      animationDelay: `${T.satellite + i * T.satelliteStep}ms`,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="smm-float"
                    style={
                      {
                        "--fy": `${sat.a}cqw`,
                        "--fr": `${sat.fr}deg`,
                        "--fd": `${sat.fd}s`,
                        animationDelay: `${T.satellite + i * T.satelliteStep + 640}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <img
                      src={sat.src}
                      alt=""
                      width={sat.w}
                      height={sat.h}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ul className="mt-8 flex list-none flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8">
        {LABELS.map((label, i) => (
          <li
            key={label}
            className="smm-label label-eyebrow"
            style={{ animationDelay: `${T.label + i * T.labelStep}ms` }}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
