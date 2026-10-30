# Registro de decisiones

Estados:

- **Aceptada**: decisión firme.
- **Propuesta**: recomendación aplicada por defecto, pendiente de confirmación del propietario.
- **Pendiente**: sin decidir; no se implementa nada que dependa de ella.
- **Sustituida**: reemplazada por otro ADR (se indica cuál).

Formato: contexto → decisión → alternativas descartadas → consecuencias.

---

## ADR-001 — Astro como framework

**Estado:** Aceptada · **Fecha:** 2026-10-30

**Contexto:** sitio de contenido estático, de una página, donde el rendimiento y el SEO son prioritarios.

**Decisión:** Astro con TypeScript estricto, generación estática. Versión instalada en la Fase 1: `astro` 7.4.4. TypeScript se fija en 6.x (6.0.3) porque `@astrojs/check` 0.9.12 aún no admite TypeScript 7.

**Alternativas descartadas:**

- Next.js: SSR y runtime de React innecesarios; más JavaScript en el cliente.
- Vite + React (SPA): renderizado en cliente, peor LCP y SEO.
- HTML/CSS/JS sin framework: sin componentes ni optimización de imágenes integrada.
- SvelteKit: válido, pero menos orientado a sitios de contenido que Astro.

**Consecuencias:** HTML estático con JavaScript mínimo; imágenes optimizadas con `astro:assets`.

## ADR-002 — Tailwind CSS v4 con tokens CSS

**Estado:** Aceptada · **Fecha:** 2026-10-30

**Contexto:** se necesita iterar rápido sobre un diseño muy cuidado y mantener la coherencia entre dos temas.

**Decisión:** Tailwind CSS v4 con los tokens definidos como CSS custom properties (`@theme`), redefinidos por tema. Integrado mediante el plugin de Vite `@tailwindcss/vite` (versiones instaladas: `tailwindcss` y `@tailwindcss/vite` 4.3.3).

**Alternativa descartada:** CSS sin framework (custom properties + estilos con alcance de componente de Astro).

**Consecuencias:** los componentes usan solo tokens semánticos.

## ADR-003 — Hosting en GitHub Pages, sin dominio propio

**Estado:** Propuesta · **Fecha:** 2026-10-30

**Contexto:** sitio estático; prioridad a opciones gratuitas.

**Decisión propuesta:** GitHub Pages, publicado mediante GitHub Actions. Sin dominio propio por ahora.

**Alternativas:** Netlify, Vercel o Cloudflare Pages (gratuitos para este caso; requieren otra cuenta). Dominio propio: unos 10–15 €/año, solo con aprobación.

**Consecuencias:** si el repositorio no se llama `<usuario>.github.io`, el sitio se sirve bajo una subruta y hay que configurar `base` en Astro. Requiere un remoto en GitHub (no existe todavía) y autorización para crearlo y desplegar.

## ADR-004 — CV en HTML + descarga en PDF

**Estado:** Aceptada · **Fecha:** 2026-10-30

**Contexto:** Chrome Android no muestra PDF dentro de un `iframe` y Safari iOS lo hace de forma limitada (R-03).

**Decisión:** opción A. Sección de CV maquetada en HTML a partir de datos, más un botón de descarga del PDF. El PDF todavía no existe (el propietario lo preparará con los proyectos pendientes de publicar): el botón solo se muestra cuando el archivo está definido en los datos del CV.

**Alternativas:**

- B: PDF incrustado en escritorio y solo enlace en móvil. Más sencillo, pero la experiencia en móvil es peor.
- C: visor con PDF.js. Funciona en todas partes, pero añade unos 300 KB cargados bajo demanda.

**Consecuencias:** el contenido del CV existe dos veces (datos HTML y PDF); hay que mantenerlos sincronizados. A cambio, mejora la accesibilidad, el SEO y la experiencia en móvil.

## ADR-005 — Sitio solo en español

**Estado:** Propuesta · **Fecha:** 2026-10-30

**Decisión propuesta:** contenido solo en español.

**Alternativas:** solo inglés (más alcance internacional), o bilingüe (amplía el alcance: rutas por idioma, selector y contenido duplicado).

**Consecuencias:** `lang="es"` en el HTML. Añadir otro idioma más adelante requiere un ADR nuevo.

## ADR-006 — Fuentes autoalojadas

**Estado:** Aceptada · **Fecha:** 2026-10-30

**Decisión:** fuentes variables autoalojadas con Fontsource; sin peticiones a Google Fonts u otros CDN.

**Motivo:** privacidad (RNF-06, RGPD) y rendimiento.

**Consecuencias:** la familia concreta se decide en ADR-011.

## ADR-007 — Sin librerías de animación ni framework de UI

**Estado:** Aceptada · **Fecha:** 2026-10-30

**Decisión:** microinteracciones y transiciones con CSS, IntersectionObserver y View Transitions API (mejora progresiva). Scripts nativos en TypeScript.

**Alternativas descartadas:** GSAP, Framer Motion, React/Svelte para interactividad. Su peso no se justifica para este alcance.

**Consecuencias:** se reconsidera solo si se aprueba una animación concreta que CSS no pueda resolver.

## ADR-008 — Mecanismo de tema claro/oscuro

**Estado:** Aceptada · **Fecha:** 2026-10-30

**Decisión:** atributo `data-theme="light|dark"` en `<html>`. Un script en línea en `<head>` aplica el tema antes del primer pintado: primero `localStorage.theme` y, si no existe, `prefers-color-scheme`. Los tokens de color se redefinen bajo cada `data-theme`.

**Selector (Fase 3):**

- Dos estados, claro y oscuro. La alternativa de tres estados, con «sistema» como opción explícita, se descartó por ser menos directa para quien visita la página.
- Mientras no haya una elección guardada, el tema sigue los cambios del sistema.
- El botón expone su estado con `aria-pressed` (pulsado = tema oscuro).
- `theme-color` se sincroniza con `--color-bg`.
- Implementación: script en línea en `src/layouts/BaseLayout.astro`, lógica en `src/scripts/theme.ts` y botón en `src/components/layout/ThemeToggle.astro`.

**Consecuencias:** sin parpadeo de tema (R-06); el selector solo cambia el atributo y lo guarda.

## ADR-009 — Documentación mínima

**Estado:** Aceptada · **Fecha:** 2026-10-30

**Decisión:** no crear `docs/arquitectura.md` (la sección 5 de `AGENTS.md` basta para un sitio estático de una página) ni `.env.example` (no hay variables de entorno ni secretos).

**Consecuencias:** se crearán si aparecen integraciones o una arquitectura con varias piezas.

## ADR-010 — Nombre de la rama principal

**Estado:** Aceptada · **Fecha:** 2026-10-30

**Contexto:** el repositorio se creó en `master`; las convenciones habituales de GitHub usan `main`.

**Decisión:** la rama principal es `main`. El propietario la renombra con `git branch -m main` antes del primer commit (`AGENTS.md` §9).

**Alternativa descartada:** mantener `master`.

## ADR-011 — Identidad visual: paleta y tipografía

**Estado:** Aceptada · **Fecha:** 2026-10-30

**Contexto:** se propusieron tres direcciones visuales con el contraste verificado: A «Índigo nocturno», B «Grafito esmeralda» y C «Tinta y coral».

**Decisión:** dirección B, «Grafito esmeralda». Estética sobria y técnica, con guiños de terminal.

- **Tipografía:** Geist (títulos y texto) y Geist Mono (etiquetas, tecnologías, detalles), ambas variables y con licencia OFL-1.1, desde `@fontsource-variable/geist` y `@fontsource-variable/geist-mono`.
- **Paleta base** (la escala completa, con `surface-elevated`, `border`, `border-strong`, `accent-hover` y `accent-soft`, está en `src/styles/global.css`):

| Token             | Oscuro    | Claro     |
| ----------------- | --------- | --------- |
| `bg`              | `#0A0A0A` | `#FAFAFA` |
| `surface`         | `#151515` | `#FFFFFF` |
| `text`            | `#EDEDED` | `#0A0A0A` |
| `text-muted`      | `#A1A1A1` | `#525252` |
| `accent`          | `#34D399` | `#047857` |
| `accent-2`        | `#A3E635` | `#4D7C0F` |
| `accent-contrast` | `#04291A` | `#FFFFFF` |

- **Contraste medido (WCAG), con la escala completa:** todos los pares de texto ≥ 4,5:1 en ambos temas; el más justo es `accent` sobre `accent-soft` en tema claro, con 4,63:1. `border-strong` ≥ 3:1 sobre `bg` y `surface` (mínimo 3,10:1 en tema claro).
- **Carga de fuentes:** se importan los CSS completos de Fontsource. Todos los subconjuntos se copian a `dist/`, pero gracias a `unicode-range` el navegador solo descarga el latino.

**Alternativas descartadas:** A (muy habitual en portafolios de desarrolladores) y C (editorial; la serifa en títulos exige más cuidado con la jerarquía).

## ADR-012 — Datos personales publicados

**Estado:** Aceptada · **Fecha:** 2026-10-30

**Contexto:** el CV y el sitio son públicos e indexables (R-01).

**Decisión:**

- **Se publican:** nombre, ubicación a nivel de ciudad («Dos Hermanas (Sevilla)»), email mediante enlace `mailto:` y perfiles de LinkedIn y GitHub.
- **No se publica:** el teléfono, ni en la web ni en el PDF público.
- **PDF público:** se le eliminan los metadatos antes de publicarlo. El original completo va en `privado/`, que está excluida de Git.

## ADR-013 — Contenido adicional

**Estado:** Aceptada (salvo la foto) · **Fecha:** 2026-10-30

**Decisión:**

- Se incluye la sección «Sobre mí» (RF-10), centrada en la transición de soporte IT a desarrollo.
- Enlaces de contacto y perfiles (RF-08): LinkedIn, GitHub y email.
- Foto: **PENDIENTE**. Por ahora no se incluye.

## ADR-014 — Convención de commits

**Estado:** Propuesta · **Fecha:** 2026-10-30

**Decisión propuesta:** Conventional Commits en español (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`).

**Consecuencias:** historial legible. Ningún commit se hace sin autorización (`AGENTS.md` §9).

## ADR-015 — Cifras y hechos del CV

**Estado:** Aceptada · **Fecha:** 2026-10-30

**Decisión:** el portafolio y el CV solo incluyen cifras y hechos que el propietario confirma y puede defender en una entrevista. No se inventan datos de relleno.

**Cifras confirmadas:** más de 50 clientes en SoftHard A&L (2020–2024); 609 tests unitarios y 106 de integración en la aplicación SoftHard A&L.
