// Rutas de archivos de `public/` respetando `base` de Astro (ADR-003: en
// GitHub Pages el sitio puede servirse bajo una subruta).
const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");

export function publicPath(path: string): string {
  return base + path.replace(/^\//, "");
}
