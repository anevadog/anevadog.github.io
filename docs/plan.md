# Plan del proyecto

Requisitos referenciados por ID (ver `AGENTS.md` §3). Decisiones referenciadas por ADR (ver `docs/decisiones.md`).
Cada fase requiere aprobación antes de empezar y validación al terminar.

Leyenda: `[ ]` pendiente · `[~]` en curso · `[x]` hecho

## Fase 0 — Documentación inicial `[x]`

- [x] Análisis y propuesta (etapa 1)
- [x] Preparación documental (etapa 2)
- [x] Revisión de la documentación por el propietario (etapa 3)
- [x] Resolver las decisiones bloqueantes de la Fase 1: ADR-002 (aceptada); ADR-010 (aceptada: `main`)

## Fase 1 — Inicialización `[x]`

Autorizada por el propietario el 2026-10-30.

- [x] Inicializar Astro con TypeScript estricto
- [x] Integrar Tailwind CSS v4
- [x] Añadir Prettier + `prettier-plugin-astro`
- [x] Página provisional `src/pages/index.astro` y `src/styles/global.css`; el resto de carpetas de `AGENTS.md` §5 se crean al añadir su primer archivo
- [x] Registrar las versiones instaladas en ADR-001 / ADR-002
- [x] Verificar `npm run dev`, `npm run build` y `astro check`

## Fase 2 — Sistema de diseño `[x]`

- [x] Proponer 2–3 direcciones visuales (paleta + tipografía) y elegir una: B «Grafito esmeralda» (ADR-011)
- [x] Definir tokens para tema claro y oscuro en `src/styles/global.css`
- [x] Verificar el contraste de todos los pares de tokens en ambos temas (RNF-03)
- [x] Autoalojar las fuentes elegidas (ADR-006)
- [x] Componentes UI base: `Button`, `Card`, `Tag`
- [x] Página interna de muestra `src/pages/muestra.astro`, revisada a 375 px y 1440 px

## Fase 3 — Layout, navegación y tema `[x]`

- [x] `BaseLayout` con metadatos SEO y Open Graph (RNF-05), precarga de la fuente latina y enlace «Saltar al contenido»
- [x] Script de tema en línea sin parpadeo + `ThemeToggle` (RF-07, ADR-008)
- [x] `Header` con navegación, menú móvil accesible y resaltado de la sección visible (RF-02)
- [x] `Footer` con enlaces desde `src/data/profile.ts` (RF-08; enlaces pendientes de ADR-013)
- [x] Favicon (`public/favicon.svg`); la imagen OG pasa a la Fase 4

## Fase 4 — Secciones `[ ]`

- [ ] Sustituir el contenido de ejemplo de `src/data/profile.ts` (checklist de contenido)
- [ ] Hero (RF-01)
- [ ] Modelo de datos y sección de proyectos (RF-03, RF-04)
- [ ] Sección de currículum según ADR-004 (RF-05, RF-06)
- [ ] Página 404 (RF-09)
- [ ] Sección «Sobre mí / Stack», si se aprueba (RF-10, ADR-013)
- [ ] Imagen Open Graph `public/og-image.png` y etiquetas `og:image` (RNF-05)

## Fase 5 — Pulido visual `[ ]`

- [ ] Microinteracciones en botones, tarjetas y navegación (RNF-04)
- [ ] Aparición de secciones con IntersectionObserver
- [ ] View Transitions como mejora progresiva
- [ ] Soporte de `prefers-reduced-motion`

## Fase 6 — Validación `[ ]`

- [ ] Responsive en 320, 375, 768, 1024 y 1440 px (RNF-01)
- [ ] Lighthouse móvil: Performance ≥ 95, Accessibility ≥ 95 (RNF-02, RNF-03)
- [ ] Navegación completa por teclado y revisión con lector de pantalla
- [ ] Pruebas en navegadores objetivo (RNF-07)
- [ ] Comprobar que no hay peticiones a terceros al cargar (RNF-06)

## Fase 7 — Despliegue `[ ]`

Requiere autorización. Bloqueada por ADR-003.

- [ ] Eliminar la página interna `src/pages/muestra.astro`
- [ ] Configurar el hosting elegido
- [ ] Configurar `site` (y `base` si aplica) en `astro.config.mjs`, y añadir `og:url` y la URL canónica
- [ ] Verificación final en producción

## Checklist de contenido (lo aporta el propietario)

- [ ] Nombre, perfil profesional y descripción breve del Hero
- [ ] Enlaces: GitHub, LinkedIn, email u otros (ADR-013)
- [ ] 3 proyectos: título, descripción, tecnologías, URL del repositorio, URL de la demo (si la hay) y captura
- [ ] CV en PDF (versión pública, ADR-012)
- [ ] Foto, si se incluye (ADR-013)

## Riesgos

| ID   | Riesgo                                                       | Mitigación                                                                       |
| ---- | ------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| R-01 | Datos personales del CV expuestos públicamente               | Versión pública reducida, metadatos eliminados, original en `privado/` (ADR-012) |
| R-02 | Bloqueo por falta de contenido                               | Contenido de ejemplo marcado como tal; checklist de contenido                    |
| R-03 | Los PDF incrustados no funcionan bien en móvil               | CV en HTML + descarga PDF (ADR-004)                                              |
| R-04 | Gradientes y transparencias que reducen el contraste         | Verificación de tokens en la Fase 2 antes de construir secciones                 |
| R-05 | Animaciones que perjudican el rendimiento o la accesibilidad | Reglas de movimiento de `AGENTS.md` §7; sin librerías de animación               |
| R-06 | Parpadeo del tema al cargar                                  | Script en línea en `<head>` (ADR-008)                                            |
| R-07 | Crecimiento del alcance                                      | Lista explícita de lo que queda fuera de alcance en `AGENTS.md` §2               |
| R-08 | Rama `master` frente a `main`                                | ADR-010                                                                          |
