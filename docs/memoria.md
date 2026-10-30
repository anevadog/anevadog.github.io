# Memoria del proyecto

Estado actual y punto de continuación. Se actualiza al final de cada sesión.

**Última actualización:** 2026-10-30

## Estado actual

- Fases 0, 1, 2 y 3 completadas.
- Stack instalado: Astro 7.4.4, Tailwind CSS 4.3.3, TypeScript 6.0.3 (estricto), Prettier 3.9.10, `@astrojs/check`, y Geist / Geist Mono (`@fontsource-variable/*` 5.3.0).
- Sistema de diseño B «Grafito esmeralda» en `src/styles/global.css` (ADR-011). Componentes base en `src/components/ui/`.
- Layout: `BaseLayout` (SEO, precarga de fuente, tema sin parpadeo, enlace «Saltar al contenido»), `Header` (navegación, menú móvil, resaltado de sección), `ThemeToggle` y `Footer`.
- `src/pages/index.astro` usa el layout con secciones provisionales (`#inicio`, `#proyectos`, `#cv`). `src/data/profile.ts` contiene datos de ejemplo marcados como PENDIENTE.
- Página interna `/muestra`; se elimina antes del despliegue.
- Git: rama `main` con commits hasta la Fase 2 y sin remoto. El propietario ejecuta `git add`, `commit` y `push`; el agente le indica cuándo y le da los comandos (`AGENTS.md` §9).

## Último paso realizado

Fase 3 validada:

- `npm run build` (con `astro check`) y `npm run format:check` sin errores.
- Tema: sigue al sistema sin preferencia guardada, la elección se guarda y tiene prioridad, y el script está en línea en `<head>`.
- Teclado: orden de tabulación correcto, foco visible y enlace «Saltar al contenido» funcional.
- Menú móvil: se cierra con `Esc` (el foco vuelve al botón), al elegir un enlace y al pulsar fuera.
- Resaltado de la sección visible al hacer scroll.
- Sin scroll horizontal a 375 px ni a 1440 px.
- La precarga apunta al mismo archivo de fuente que usa el CSS.

## Siguiente paso

1. El propietario hace el commit de la Fase 3.
2. Planificar la Fase 4 (secciones). Necesita el contenido del propietario (checklist en `docs/plan.md`) y las decisiones ADR-004, ADR-012 y ADR-013.

## Decisiones abiertas

Detalle en `docs/decisiones.md`.

- **Propuestas (aplicadas por defecto, pendientes de confirmar):** ADR-003, ADR-004, ADR-005, ADR-014.
- **Pendientes:** ADR-012, ADR-013.

## Bloqueos

- Contenido del propietario (checklist de contenido en `docs/plan.md`). Ahora bloquea la Fase 4.
