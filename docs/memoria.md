# Memoria del proyecto

Estado actual y punto de continuación. Se actualiza al final de cada sesión.

**Última actualización:** 2026-10-30

## Estado actual

- Fases 0 a 3 completadas. Fase 4 implementada, pero abierta a la espera de contenido del propietario.
- Stack: Astro 7.4.4, Tailwind CSS 4.3.3, TypeScript 6.0.3 (estricto), Prettier 3.9.10, `@astrojs/check`, Geist / Geist Mono (`@fontsource-variable/*` 5.3.0).
- Sistema de diseño B «Grafito esmeralda» (ADR-011). Layout, cabecera, menú móvil, tema y pie listos (Fase 3).
- Página completa con datos reales:
  - Hero, «Sobre mí», Proyectos (SoftHard A&L y dos tarjetas «en desarrollo») y CV en HTML.
  - Página 404 e imagen Open Graph en `public/og-image.png`.
  - Datos en `src/data/profile.ts`, `projects.ts` y `resume.ts`. El teléfono no se publica (ADR-012); solo cifras confirmadas (ADR-015).
- Página interna `/muestra`; se elimina antes del despliegue.
- Git: rama `main` con commits hasta la Fase 3 y sin remoto. El propietario ejecuta `git add`, `commit` y `push`; el agente le indica cuándo y le da los comandos (`AGENTS.md` §9).

## Último paso realizado

Fase 4 validada:

- `npm run build` (con `astro check`) y `npm run format:check` sin errores.
- Navegador a 375, 768 y 1440 px, en ambos temas, sin scroll horizontal.
- Enlaces externos con `noopener noreferrer`; «Solicitar acceso» abre un `mailto:` con asunto.
- Un único `h1`. La página 404 funciona.
- El teléfono no aparece en `dist/`, `src/` ni `public/`.
- Contraste revisado sobre el brillo del Hero. En tema claro, la línea `whoami` usa `accent` (4,57:1 en el peor caso), porque `accent-2` bajaba a 4,16:1.
- Corregidos los espacios que Prettier y Astro eliminaban junto a etiquetas en línea (convención añadida en `AGENTS.md` §6).

## Siguiente paso

1. El propietario hace el commit de la Fase 4.
2. Pendiente del propietario: capturas de SoftHard A&L, los otros dos proyectos y el PDF del CV (sin teléfono). Cuando lleguen, se completa la Fase 4.
3. Mientras tanto se puede planificar la Fase 5 (pulido visual y animaciones).

## Decisiones abiertas

Detalle en `docs/decisiones.md`.

- **Propuestas (aplicadas por defecto, pendientes de confirmar):** ADR-003, ADR-005, ADR-014.
- **Pendientes:** foto (ADR-013).

## Bloqueos

- Ninguno para la Fase 5. El contenido pendiente solo bloquea el cierre de la Fase 4.
