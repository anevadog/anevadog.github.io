// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// `site` (y `base`, si aplica) se configuran en la Fase 7 según ADR-003.
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
