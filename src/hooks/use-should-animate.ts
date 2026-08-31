import { useEffect, useRef, useState } from "react";

/**
 * `true` solo quando l'elemento è nel viewport **e** la scheda è in primo piano.
 *
 * Le animazioni continue (loop `requestAnimationFrame`, rotazioni CSS infinite)
 * vanno legate a questo valore: un'animazione che nessuno sta guardando occupa
 * il thread principale e consuma batteria per niente.
 *
 * A differenza di un observer "one-shot" usato per le entrate in scena, questo
 * continua a osservare: torna `false` quando l'elemento esce di nuovo.
 */
export function useShouldAnimate<T extends Element>(rootMargin = "150px") {
  const ref = useRef<T | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const supported = typeof IntersectionObserver !== "undefined";
    // Senza IntersectionObserver è meglio animare sempre che non animare mai.
    let inView = !supported;

    const sync = () => setShouldAnimate(inView && !document.hidden);
    sync();

    const observer = supported
      ? new IntersectionObserver(
          (entries) => {
            inView = entries.some((entry) => entry.isIntersecting);
            sync();
          },
          // Il margine fa ripartire l'animazione poco prima che l'elemento
          // rientri, così non si vede il momento in cui riprende.
          { rootMargin },
        )
      : null;

    observer?.observe(node);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [rootMargin]);

  return { ref, shouldAnimate } as const;
}
