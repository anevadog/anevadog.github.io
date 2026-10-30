// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages en el repositorio `anevadog.github.io`: se sirve en la raíz,
// sin `base` (ADR-003).
export default defineConfig({
  site: "https://anevadog.github.io",
  vite: {
    plugins: [tailwindcss()],
  },
});
