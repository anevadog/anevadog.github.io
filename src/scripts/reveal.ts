/*
 * Aparición al hacer scroll (Fase 5). Solo oculta elementos si puede
 * mostrarlos después: requiere IntersectionObserver y que el usuario no pida
 * reducir el movimiento. Los elementos que entran a la vez se escalonan.
 */
const MAX_STAGGER = 5;

const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (elements.length > 0 && !reduceMotion && "IntersectionObserver" in window) {
  document.documentElement.dataset.revealReady = "";

  const observer = new IntersectionObserver(
    (entries) => {
      let index = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.style.setProperty(
          "--reveal-index",
          String(Math.min(index++, MAX_STAGGER)),
        );
        element.dataset.revealed = "";
        observer.unobserve(element);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );

  for (const element of elements) observer.observe(element);
}
