/*
 * Selector de tema claro/oscuro (RF-07, ADR-008). El tema inicial lo aplica el
 * script en línea de BaseLayout; aquí se gestionan el cambio, la persistencia
 * y el seguimiento del tema del sistema mientras no haya elección guardada.
 */
type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const root = document.documentElement;
const systemDark = matchMedia("(prefers-color-scheme: dark)");

function currentTheme(): Theme {
  return root.dataset.theme === "dark" ? "dark" : "light";
}

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function store(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Sin almacenamiento disponible: el tema se mantiene solo en esta visita.
  }
}

function apply(theme: Theme) {
  root.dataset.theme = theme;

  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  if (meta) {
    meta.content = getComputedStyle(root).getPropertyValue("--color-bg").trim();
  }

  for (const button of document.querySelectorAll("[data-theme-toggle]")) {
    button.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

export function initTheme() {
  apply(currentTheme());

  for (const button of document.querySelectorAll("[data-theme-toggle]")) {
    button.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      apply(next);
      store(next);
    });
  }

  systemDark.addEventListener("change", (event) => {
    if (!readStored()) apply(event.matches ? "dark" : "light");
  });
}
