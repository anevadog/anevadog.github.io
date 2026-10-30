# Memoria del proyecto

Estado actual y punto de continuación. Se actualiza al final de cada sesión.

**Última actualización:** 2026-10-30

## Estado actual

- Fases 0 a 3 y 5 completadas. Fase 4 implementada (commit `528d4f7`), pero abierta a la espera de contenido del propietario.
- Stack: Astro 7.4.4, Tailwind CSS 4.3.3, TypeScript 6.0.3 (estricto), Prettier 3.9.10, `@astrojs/check`, Geist / Geist Mono (`@fontsource-variable/*` 5.3.0).
- Página completa con datos reales:
  - Hero, «Sobre mí», Proyectos y CV en HTML.
  - Página 404 e imagen Open Graph.
  - Sistema de diseño B «Grafito esmeralda», tema claro/oscuro sin parpadeo y menú móvil accesible.
- Git: rama `main` con commits hasta la Fase 4; la Fase 5 está pendiente de commit. Sin remoto. El propietario ejecuta `git add`, `commit` y `push`; el agente le indica cuándo y le da los comandos (`AGENTS.md` §9).

## Último paso realizado

Fase 5 (pulido visual) implementada y validada en el navegador integrado:

- Build, tipos y formato.
- El `<h1>` del Hero nunca tiene opacidad 0 y solo se animan `opacity` y `translate`.
- Las 20 zonas con aparición al hacer scroll se muestran al entrar en pantalla.
- El hover de la tarjeta sigue funcionando tras la animación y no activa el del botón interior.
- El cambio de tema usa View Transitions sin errores.
- El menú móvil se abre y se cierra con fundido (estados finales correctos).
- El borde de la cabecera solo aparece tras hacer scroll.
- Sin scroll horizontal a 375 y 1440 px.

Nota: el navegador integrado reproduce las animaciones unas 5 veces más despacio que su duración configurada (200 ms medidos como unos 1000 ms). Las duraciones se verificaron leyendo su configuración.

## Siguiente paso

1. El propietario hace el commit de la Fase 5.
2. Planificar la Fase 6 (validación: Lighthouse, navegadores reales, movimiento reducido; pendientes T-1 a T-3).

## Pendientes

### Del propietario: contenido

| #   | Pendiente                                                                                                                                                                                 | Dónde se usa                                                                     | Bloquea          |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------- |
| P-1 | 1–2 capturas de SoftHard A&L (PNG o JPG, solo datos ficticios)                                                                                                                            | `src/assets/projects/`, campos `image` e `imageAlt` en `projects.ts`             | Cierre de Fase 4 |
| P-2 | Proyectos 2 y 3: título, subtítulo, año, descripción, 2–3 puntos clave, tecnologías, URL del repositorio público, demo (opcional) y captura                                               | Sustituyen las tarjetas «en desarrollo» de `projects.ts`                         | Cierre de Fase 4 |
| P-3 | PDF del CV: versión pública sin teléfono, con el apartado Formación y sin metadatos. Nombre propuesto: `CV-Alexander-Nevado-Garcia.pdf`                                                   | `public/cv/` y campo `pdf` en `resume.ts` (activa el botón de descarga)          | Cierre de Fase 4 |
| P-4 | Revisar los textos redactados por el agente: frase del Hero, título y párrafos de «Sobre mí», subtítulo de Proyectos, texto de las tarjetas «en desarrollo» y descripción para buscadores | `Hero.astro`, `About.astro`, `Projects.astro`, `ProjectCard.astro`, `profile.ts` | Cierre de Fase 4 |

### Del propietario: decisiones

| #   | Pendiente                                                                                                                                 | Referencia | Bloquea |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- |
| P-5 | Confirmar el hosting (propuesta: GitHub Pages, sin dominio propio) y el nombre del repositorio en GitHub, que define si hace falta `base` | ADR-003    | Fase 7  |
| P-6 | Crear el repositorio remoto en GitHub, conectarlo y hacer el primer `push`. Lo hace el propietario con los comandos que le dé el agente   | ADR-003    | Fase 7  |
| P-7 | Confirmar el sitio solo en español (propuesta)                                                                                            | ADR-005    | —       |
| P-8 | Confirmar Conventional Commits en español (propuesta, ya en uso)                                                                          | ADR-014    | —       |
| P-9 | Decidir si se incluye foto                                                                                                                | ADR-013    | —       |

### Técnicos: del agente, ya planificados

| #   | Pendiente                                                                                                                                                                                       | Fase   |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| T-1 | Comprobar `prefers-reduced-motion` en un navegador real (el navegador integrado no lo emula)                                                                                                    | Fase 6 |
| T-2 | Auditoría Lighthouse (Performance y Accessibility ≥ 95). Si requiere instalar una herramienta, se pedirá autorización; alternativa: Lighthouse de Chrome DevTools, ejecutado por el propietario | Fase 6 |
| T-3 | Pruebas en Firefox, Safari (iOS) y Chrome Android                                                                                                                                               | Fase 6 |
| T-4 | Eliminar `src/pages/muestra.astro`                                                                                                                                                              | Fase 7 |
| T-5 | Configurar `site` (y `base` si aplica), y añadir `og:url`, `og:image` y la URL canónica                                                                                                         | Fase 7 |
