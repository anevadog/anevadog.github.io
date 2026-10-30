# Memoria del proyecto

Estado actual y punto de continuación. Se actualiza al final de cada sesión.

**Última actualización:** 2026-10-30

## Estado actual

- Fases 0 a 3, 5 y 6 completadas. Fase 4 implementada (commit `528d4f7`), pero abierta a la espera de contenido del propietario.
- Fase 7 implementada en local: falta que el propietario cree el repositorio, haga el commit y el primer `push` y active Pages.
- Stack: Astro 7.4.4, Tailwind CSS 4.3.3, TypeScript 6.0.3 (estricto), Prettier 3.9.10, `@astrojs/check`, Geist / Geist Mono (`@fontsource-variable/*` 5.3.0).
- Página completa con datos reales:
  - Hero, «Sobre mí», Proyectos y CV en HTML.
  - Página 404 e imagen Open Graph.
  - Sistema de diseño B «Grafito esmeralda», tema claro/oscuro sin parpadeo y menú móvil accesible.
- Git: rama `main` con commits hasta la Fase 6 (`c5883d9`); la Fase 7 está pendiente de commit. Sin remoto todavía (destino: `github.com/anevadog/anevadog.github.io`, público). El propietario ejecuta `git add`, `commit` y `push`; el agente le indica cuándo y le da los comandos (`AGENTS.md` §9).

## Último paso realizado

Fase 7 (despliegue) implementada en local, con el contenido pendiente tal como está (aprobado por el propietario):

- Auditoría previa a hacer público el repositorio: sin teléfonos, secretos ni `privado/` en el historial; imagen OG sin metadatos.
- Eliminada `src/pages/muestra.astro`.
- `site: "https://anevadog.github.io"` (sin `base`); URL canónica, `og:url`, `og:image` absoluta con dimensiones y texto alternativo, y Twitter `summary_large_image`. La 404 lleva `noindex`.
- Workflow `.github/workflows/deploy.yml` con acciones oficiales de GitHub (checkout v7, setup-node v7, configure-pages v6, upload-pages-artifact v5, deploy-pages v5).
- `npm run build` y `format:check` correctos; metadatos revisados en `dist/`.

La Fase 6 (validación) está detallada en `docs/plan.md`.

Notas para futuras pruebas:

- **Medir siempre el build de producción.** `npm run preview` (o `astro preview --port 4322` si el 4321 está ocupado). Comprueba en la salida en qué puerto arranca: si el propietario tiene `npm run dev` abierto en el 4321, el preview salta a otro puerto y Lighthouse mediría el servidor de desarrollo.
- **Velocidad de las animaciones.** El navegador integrado las reproduce unas 5 veces más despacio de lo configurado.
- **Capturas de Firefox.** `firefox --headless --screenshot` captura en el instante de carga, antes de las animaciones de entrada. Para revisar el diseño, usa un perfil temporal con `ui.prefersReducedMotion`.

## Siguiente paso

1. El propietario crea el repositorio público `anevadog.github.io`, hace el commit de la Fase 7 y el primer `push`, y activa Pages con «GitHub Actions» (P-6).
2. Verificación en producción: carga, 404, metadatos OG, Lighthouse sobre la URL publicada y comprobaciones en Safari iOS y Chrome Android (T-3).
3. Contenido pendiente (P-1 a P-4): cada `push` a `main` vuelve a publicar.

## Pendientes

### Del propietario: contenido

| #   | Pendiente                                                                                                                                                                                 | Dónde se usa                                                                     | Bloquea          |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------- |
| P-1 | 1–2 capturas de SoftHard A&L (PNG o JPG, solo datos ficticios)                                                                                                                            | `src/assets/projects/`, campos `image` e `imageAlt` en `projects.ts`             | Cierre de Fase 4 |
| P-2 | Proyectos 2 y 3: título, subtítulo, año, descripción, 2–3 puntos clave, tecnologías, URL del repositorio público, demo (opcional) y captura                                               | Sustituyen las tarjetas «en desarrollo» de `projects.ts`                         | Cierre de Fase 4 |
| P-3 | PDF del CV: versión pública sin teléfono, con el apartado Formación y sin metadatos. Nombre propuesto: `CV-Alexander-Nevado-Garcia.pdf`                                                   | `public/cv/` y campo `pdf` en `resume.ts` (activa el botón de descarga)          | Cierre de Fase 4 |
| P-4 | Revisar los textos redactados por el agente: frase del Hero, título y párrafos de «Sobre mí», subtítulo de Proyectos, texto de las tarjetas «en desarrollo» y descripción para buscadores | `Hero.astro`, `About.astro`, `Projects.astro`, `ProjectCard.astro`, `profile.ts` | Cierre de Fase 4 |

### Del propietario: decisiones

| #   | Pendiente                                                                                                                                                                    | Referencia | Bloquea |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- |
| P-5 | ~~Confirmar el hosting (propuesta: GitHub Pages, sin dominio propio) y el nombre del repositorio en GitHub, que define si hace falta `base`~~ Decidido: `anevadog.github.io` | ADR-003    | —       |
| P-6 | Crear el repositorio remoto en GitHub, conectarlo y hacer el primer `push`. Lo hace el propietario con los comandos que le dé el agente                                      | ADR-003    | Fase 7  |
| P-7 | Confirmar el sitio solo en español (propuesta)                                                                                                                               | ADR-005    | —       |
| P-8 | Confirmar Conventional Commits en español (propuesta, ya en uso)                                                                                                             | ADR-014    | —       |
| P-9 | Decidir si se incluye foto                                                                                                                                                   | ADR-013    | —       |

### Técnicos: del agente, ya planificados

| #   | Pendiente                                                                                                        | Fase   |
| --- | ---------------------------------------------------------------------------------------------------------------- | ------ |
| T-1 | ~~Comprobar `prefers-reduced-motion` en un navegador real~~ Hecho en la Fase 6 (Chrome y Firefox)                | Fase 6 |
| T-2 | ~~Auditoría Lighthouse~~ Hecho en la Fase 6 (100 en todas las categorías)                                        | Fase 6 |
| T-3 | Firefox: hecho en la Fase 6. Pendiente: Safari iOS y Chrome Android en dispositivos reales, con la web publicada | Fase 7 |
| T-4 | ~~Eliminar `src/pages/muestra.astro`~~ Hecho                                                                     | Fase 7 |
| T-5 | ~~Configurar `site`, `og:url`, `og:image` y la URL canónica~~ Hecho                                              | Fase 7 |
