# Memoria del proyecto

Estado actual y punto de continuación. Se actualiza al final de cada sesión.

**Última actualización:** 2026-10-30

## Estado actual

- Fases 0, 1 y 2 completadas.
- Stack instalado: Astro 7.4.4, Tailwind CSS 4.3.3, TypeScript 6.0.3 (estricto), Prettier 3.9.10, `@astrojs/check`, y Geist / Geist Mono (`@fontsource-variable/*` 5.3.0).
- Sistema de diseño B «Grafito esmeralda» en `src/styles/global.css`, con los tokens de ambos temas y el contraste verificado (ADR-011).
- Componentes base: `src/components/ui/Button.astro`, `Card.astro` y `Tag.astro`.
- Página interna `/muestra` para revisar tokens y componentes; se elimina antes del despliegue.
- `src/pages/index.astro` sigue siendo la página provisional.
- Git: rama `main` con commits de las Fases 0 y 1 y sin remoto. El propietario ejecuta `git add`, `commit` y `push`; el agente le indica cuándo y le da los comandos (`AGENTS.md` §9).

## Último paso realizado

Fase 2: tokens y temas, fuentes autoalojadas, componentes base y página de muestra. Validado: contraste medido, `npm run build` (con `astro check`) y `npm run format:check` sin errores, fuentes cargadas sin peticiones a terceros y sin scroll horizontal a 375 px ni a 1440 px.

## Siguiente paso

1. El propietario hace el commit de la Fase 2.
2. Planificar la Fase 3 (layout, navegación y tema) y pedir aprobación.

## Decisiones abiertas

Detalle en `docs/decisiones.md`.

- **Propuestas (aplicadas por defecto, pendientes de confirmar):** ADR-003, ADR-004, ADR-005, ADR-014.
- **Pendientes:** ADR-012, ADR-013.

## Bloqueos

- Contenido del propietario (ver la checklist de contenido en `docs/plan.md`). No bloquea hasta la Fase 4.
