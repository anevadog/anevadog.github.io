# Memoria del proyecto

Estado actual y punto de continuación. Se actualiza al final de cada sesión.

**Última actualización:** 2026-10-30

## Estado actual

- Fases 0 (documentación inicial) y 1 (inicialización) completadas.
- Astro 7.4.4, Tailwind CSS 4.3.3, TypeScript 6.0.3 (estricto), Prettier 3.9.10 y `@astrojs/check` instalados.
- Página provisional en `src/pages/index.astro`. `npm run build` (con `astro check`), `npm run dev` y `npm run format:check` funcionan sin errores.
- Repositorio Git en la rama `master`, sin commits y sin remoto. El propietario ejecuta él mismo `git add`, `commit` y `push` (`AGENTS.md` §9).

## Último paso realizado

Fase 1: dependencias instaladas, configuración creada (`package.json`, `astro.config.mjs`, `tsconfig.json`, `.prettierrc.json`, `.prettierignore`), documentación formateada con Prettier y ADR-001 y ADR-002 actualizados.

## Siguiente paso

1. El propietario hace los primeros commits con los comandos indicados por el agente.
2. Aclarar ADR-010 (mantener `master` o renombrar a `main`) antes del primer commit.
3. Fase 2 (sistema de diseño): proponer 2–3 direcciones visuales (ADR-011).

## Decisiones abiertas

Detalle en `docs/decisiones.md`.

- **Propuestas (aplicadas por defecto, pendientes de confirmar):** ADR-003, ADR-004, ADR-005, ADR-014.
- **Pendientes:** ADR-010 (falta aclarar la opción), ADR-011, ADR-012, ADR-013.

## Bloqueos

- Contenido del propietario (ver la checklist de contenido en `docs/plan.md`). No bloquea hasta la Fase 4.
