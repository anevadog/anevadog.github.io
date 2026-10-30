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

## Fase 4 — Secciones `[~]`

Implementada el 2026-10-30. Queda abierta hasta recibir el contenido pendiente (ver la checklist de contenido).

- [x] Datos reales en `src/data/profile.ts`, `projects.ts` y `resume.ts`
- [x] Hero (RF-01)
- [x] Sección «Sobre mí» (RF-10, ADR-013)
- [x] Modelo de datos y sección de proyectos (RF-03, RF-04). SoftHard A&L más dos tarjetas «en desarrollo»
- [x] Sección de currículum en HTML según ADR-004 (RF-05). La descarga (RF-06) se activa al definir `resume.pdf`
- [x] Página 404 (RF-09)
- [x] Imagen Open Graph `public/og-image.png`. La etiqueta `og:image` se añade en la Fase 7
- [ ] Capturas de SoftHard A&L en `src/assets/projects/` (campo `image` del proyecto)
- [ ] Sustituir las tarjetas «en desarrollo» por los proyectos reales
- [ ] Añadir el PDF del CV a `public/cv/` y definir `resume.pdf`

## Fase 5 — Pulido visual `[x]`

- [x] Microinteracciones (RNF-04): flecha de los botones, zoom del motivo de la tarjeta de proyecto y borde de la cabecera solo tras hacer scroll
- [x] Aparición de secciones con IntersectionObserver (`src/scripts/reveal.ts`) y entrada escalonada del Hero
- [x] View Transitions como mejora progresiva (cambio de tema) y fundido del menú móvil
- [x] Soporte de `prefers-reduced-motion`; las animaciones solo se aplican en pantalla, no al imprimir

## Fase 6 — Validación `[x]`

Realizada el 2026-10-30 sobre el build de producción (`astro preview`).

- [x] Responsive en 320, 375, 768, 1024 y 1440 px, sin scroll horizontal (RNF-01)
- [x] Lighthouse 13.6.0 (RNF-02, RNF-03): 100 en Performance, Accessibility, Best Practices y SEO, en móvil y escritorio. Móvil: LCP 1,2 s, CLS 0, TBT 0 ms. Informes en `.lighthouseci/` (ignorada por Git)
- [x] Navegación por teclado completa (15 elementos, orden lógico, foco visible) y revisión estructural: títulos sin saltos, zonas de página, `lang`, nombres accesibles e ids únicos. Revisión con lector de pantalla real: pendiente (propietario, opcional)
- [x] Movimiento reducido real: Chrome con `--force-prefers-reduced-motion` y Firefox con `ui.prefersReducedMotion`. No se oculta nada y no hay animaciones (RNF-04)
- [x] Firefox (Gecko) a 1440 y 375 px: diseño, fuentes y gradiente correctos (RNF-07). Safari iOS y Chrome Android pasan a la Fase 7, con la web publicada
- [x] Sin peticiones a terceros: la primera carga son 67,6 KiB (HTML, CSS y dos fuentes), todo servido desde el propio sitio (RNF-06)
- [x] Correcciones: un bloque con el foco se muestra aunque no se haya revelado aún, y el puesto del Hero usa `text-balance` (en móvil, «DAM» quedaba sola)

## Fase 7 — Despliegue `[ ]`

Aprobada el 2026-10-30: GitHub Pages en `anevadog.github.io`, publicando con el contenido pendiente (ADR-003).

- [x] Auditoría previa: historial de Git sin teléfonos, secretos ni `privado/`; imagen OG sin metadatos
- [x] Eliminar la página interna `src/pages/muestra.astro`
- [x] Configurar el hosting: workflow `.github/workflows/deploy.yml` (acciones oficiales de GitHub, Node desde `.nvmrc`, `npm run build`)
- [x] Configurar `site` en `astro.config.mjs` (sin `base`), y añadir `og:url`, `og:image` con dimensiones y texto alternativo, Twitter `summary_large_image` y la URL canónica. La 404 lleva `noindex` y no tiene URL canónica
- [ ] Crear el repositorio remoto, primer `push` y activar Pages con «GitHub Actions» (propietario, P-6)
- [ ] Verificación final en producción
- [ ] Pruebas en dispositivos reales: Safari iOS y Chrome Android (lista de comprobaciones para el propietario)

## Checklist de contenido (lo aporta el propietario)

- [x] Nombre, perfil profesional y descripción breve del Hero
- [x] Enlaces: LinkedIn, GitHub y email (ADR-013)
- [x] Contenido del CV (experiencia, competencias, idiomas), revisado el 2026-10-30
- [x] Formación: CFGS Desarrollo de Aplicaciones Multiplataforma — CEAC · 2025–actualidad
- [ ] 3 proyectos: 1 de 3 (SoftHard A&L, repositorio privado bajo petición). Faltan capturas de SoftHard y los otros dos proyectos (públicos cuando estén terminados)
- [ ] CV en PDF (versión pública sin teléfono, ADR-012)
- [ ] Foto: PENDIENTE (ADR-013)

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
