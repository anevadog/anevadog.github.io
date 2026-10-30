# AGENTS.md — Portafolio web personal

Fuente principal de contexto y reglas del proyecto. Cualquier agente o colaborador debe leer este archivo antes de trabajar.

- Estado actual y punto de continuación: [`docs/memoria.md`](docs/memoria.md)
- Fases y tareas: [`docs/plan.md`](docs/plan.md)
- Decisiones técnicas: [`docs/decisiones.md`](docs/decisiones.md)

## 1. Propósito

Portafolio web personal, de una sola página, dirigido principalmente a reclutadores. Debe transmitir profesionalidad, personalidad y capacidad técnica, y demostrar criterio de diseño y atención al detalle, con una navegación clara y un buen rendimiento.

## 2. Alcance

### Incluido

- Sección Hero, proyectos destacados (3), currículum (consulta y descarga en PDF), navegación, pie con enlaces.
- Tema claro y oscuro con selector.
- Diseño responsive (móvil, tablet, escritorio).
- SEO básico y metadatos para compartir en redes.
- Página 404 propia.

### Fuera de alcance (hasta nueva decisión)

- Formulario de contacto con backend.
- Blog, CMS o panel de administración.
- Analítica o cualquier rastreo de terceros.
- Versión multidioma (ver ADR-005).
- Obtención automática de proyectos desde la API de GitHub.

### Supuestos

- El propietario aporta textos, datos de los 3 proyectos (con capturas) y el CV en PDF.
- Sitio estático sin backend ni secretos.
- Despliegue en hosting estático gratuito (ver ADR-003).

## 3. Requisitos

Prioridad: **M** = imprescindible · **S** = debería · **C** = deseable.

### Funcionales

| ID    | Requisito                                                    | Prio. | Criterio de aceptación                                                                                                  |
| ----- | ------------------------------------------------------------ | ----- | ----------------------------------------------------------------------------------------------------------------------- |
| RF-01 | Hero con nombre, perfil profesional, descripción breve y CTA | M     | Visible sin scroll en 375 px y 1440 px; al menos dos CTA (ver proyectos, ver/descargar CV)                              |
| RF-02 | Navegación entre secciones                                   | M     | Enlace a cada sección con scroll suave; menú móvil operable con teclado, cierra con `Esc` y al elegir un enlace         |
| RF-03 | Sección de 3 proyectos destacados                            | M     | Cada tarjeta muestra imagen, título, descripción y tecnologías; los enlaces a repositorio/demo solo aparecen si existen |
| RF-04 | Datos de proyectos separados del marcado                     | M     | Añadir o editar un proyecto solo requiere modificar `src/data/projects.ts`                                              |
| RF-05 | Consulta del CV en la web                                    | M     | Legible en escritorio y móvil según la opción elegida en ADR-004                                                        |
| RF-06 | Descarga del CV en PDF                                       | M     | Botón de descarga con nombre de archivo descriptivo, funcional en todos los navegadores objetivo                        |
| RF-07 | Selector de tema claro/oscuro                                | M     | Respeta `prefers-color-scheme` la primera vez, persiste la elección y no hay parpadeo de tema al cargar                 |
| RF-08 | Enlaces de contacto y perfiles                               | S     | Visibles en Hero o pie y funcionales. Enlaces concretos: **PENDIENTE** (ADR-013)                                        |
| RF-09 | Página 404 propia                                            | C     | Una ruta inexistente muestra la 404 con el diseño del sitio                                                             |
| RF-10 | Sección «Sobre mí / Stack»                                   | C     | **PENDIENTE** de decidir si se incluye (ADR-013)                                                                        |

### No funcionales

| ID     | Requisito                 | Prio. | Criterio de aceptación                                                                                                                                                                              |
| ------ | ------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-01 | Responsive                | M     | Sin scroll horizontal en 320, 375, 768, 1024 y 1440 px                                                                                                                                              |
| RNF-02 | Rendimiento               | M     | Lighthouse móvil: Performance ≥ 95; LCP < 2,5 s; CLS < 0,1                                                                                                                                          |
| RNF-03 | Accesibilidad WCAG 2.2 AA | M     | Contraste ≥ 4,5:1 (texto normal) y ≥ 3:1 (texto grande y componentes) en ambos temas, también sobre gradientes y transparencias; foco visible; navegable por teclado; Lighthouse Accessibility ≥ 95 |
| RNF-04 | Animaciones moderadas     | M     | Solo se animan `transform` y `opacity`; se respeta `prefers-reduced-motion`                                                                                                                         |
| RNF-05 | SEO y metadatos           | S     | `title`, `description`, Open Graph y Twitter Card; imagen OG; favicon; HTML semántico                                                                                                               |
| RNF-06 | Privacidad                | S     | Sin cookies ni peticiones a terceros al cargar; fuentes autoalojadas                                                                                                                                |
| RNF-07 | Compatibilidad            | M     | Últimas 2 versiones de Chrome, Firefox, Safari y Edge; Safari iOS y Chrome Android                                                                                                                  |
| RNF-08 | Mantenibilidad            | S     | TypeScript estricto; componentes pequeños; tokens de diseño centralizados                                                                                                                           |

## 4. Stack

| Pieza                  | Elección                                                                  | Decisión            |
| ---------------------- | ------------------------------------------------------------------------- | ------------------- |
| Framework              | Astro (versión estable más reciente al inicializar) + TypeScript estricto | ADR-001             |
| Estilos                | Tailwind CSS v4 + tokens en CSS custom properties                         | ADR-002             |
| Interactividad         | Scripts nativos en TypeScript, sin framework de UI                        | ADR-007             |
| Transiciones           | CSS + View Transitions API (mejora progresiva)                            | ADR-007             |
| Tipografía             | Fuentes variables autoalojadas con Fontsource                             | ADR-006 / ADR-011   |
| Formato y comprobación | Prettier (+ `prettier-plugin-astro`), `astro check`                       | —                   |
| Hosting                | GitHub Pages                                                              | ADR-003 (Propuesta) |
| Entorno                | Node 24 (`.nvmrc`), npm                                                   | —                   |

No se añaden dependencias fuera de esta tabla sin aprobación previa (ver §9).

## 5. Arquitectura

Sitio estático generado en tiempo de compilación. Sin servidor, base de datos ni variables de entorno.

- **Página única** (`src/pages/index.astro`) compuesta por componentes de sección.
- **Contenido como datos**: `src/data/profile.ts` (perfil, enlaces) y `src/data/projects.ts` (proyectos tipados). Los componentes no contienen texto de contenido.
- **Imágenes** de proyectos en `src/assets/projects/`, optimizadas con `astro:assets` (formatos modernos, dimensiones explícitas para evitar CLS).
- **CV** público en `public/cv/`, servido tal cual para la descarga.
- **Tema**: atributo `data-theme="light|dark"` en `<html>`. Un script en línea en `<head>` lo aplica antes del primer pintado leyendo `localStorage` (clave `theme`) o, si no existe, `prefers-color-scheme`. Los colores son tokens CSS que se redefinen por tema (ADR-008).
- **JavaScript en cliente** mínimo: tema, menú móvil y aparición de elementos al hacer scroll (IntersectionObserver).

### Estructura de carpetas

```
portafolio/
├── AGENTS.md · CLAUDE.md · README.md
├── .gitignore · .gitattributes · .editorconfig · .nvmrc
├── docs/                    plan.md · memoria.md · decisiones.md
├── privado/                 (ignorada por Git) CV original con datos completos
├── public/
│   ├── cv/                  CV público en PDF
│   ├── favicon.svg
│   └── og-image.png
└── src/
    ├── assets/projects/     capturas de proyectos
    ├── components/
    │   ├── layout/          Header, Footer, ThemeToggle
    │   ├── sections/        Hero, Projects, Resume
    │   └── ui/              Button, Card, Tag
    ├── data/                profile.ts, projects.ts
    ├── layouts/             BaseLayout.astro
    ├── pages/               index.astro, 404.astro
    ├── scripts/             theme.ts, reveal.ts
    └── styles/              global.css (tokens y temas)
```

Configuración en la raíz: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.prettierrc.json` y `.prettierignore`. Las carpetas de `src/` se crean al añadir su primer archivo (Git no versiona carpetas vacías).

Scripts: `npm run dev`, `npm run build` (ejecuta `astro check` antes de compilar), `npm run preview`, `npm run check`, `npm run format`, `npm run format:check`.

## 6. Convenciones

- **Idioma**: contenido del sitio en español (ADR-005). Código (nombres de variables, componentes, archivos) en inglés. Documentación y comentarios en español.
- **Nombres**: componentes en `PascalCase.astro`; scripts y datos en `camelCase.ts`; carpetas en minúsculas.
- **Componentes**: una responsabilidad por componente; props tipadas con `interface Props`.
- **Estilos**: usar siempre tokens semánticos (`bg`, `surface`, `text`, `accent`…), nunca colores literales en componentes.
- **Accesibilidad**: HTML semántico (`header`, `nav`, `main`, `section` con encabezado, `footer`); un único `h1`; `alt` descriptivo en imágenes; enlaces externos con `rel="noopener noreferrer"`.
- **Formato**: Prettier con la configuración por defecto salvo decisión contraria; `.editorconfig` para el editor.
- **Commits**: Conventional Commits en español (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`). Propuesta, ver ADR-014.

## 7. Sistema de diseño

### Principios

- Contemporáneo, tecnológico y profesional; personalidad sin sacrificar claridad.
- Gradientes, transparencias y profundidad solo cuando aporten jerarquía o foco.
- Jerarquía tipográfica clara; espacio en blanco generoso.
- Coherencia total entre tema claro y oscuro: misma identidad, contraste verificado en ambos.

### Tokens semánticos (valores **PENDIENTE**, ADR-011)

`--color-bg`, `--color-surface`, `--color-surface-elevated`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-accent-contrast`, `--gradient-brand`, `--shadow-elevated`, `--font-sans`, `--font-display`, `--font-mono`.

### Movimiento

- Microinteracciones (hover, foco, pulsación): 150–250 ms.
- Aparición de secciones: ≤ 600 ms, una sola vez por elemento.
- Solo `transform` y `opacity`. Con `prefers-reduced-motion: reduce`, se eliminan desplazamientos y se mantienen cambios de opacidad instantáneos o muy breves.

### Breakpoints

Los de Tailwind por defecto: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 px. Diseño _mobile-first_.

## 8. Definición de terminado

Una tarea está terminada cuando:

1. Cumple los criterios de aceptación de los requisitos asociados (§3).
2. `npm run build` y `astro check` terminan sin errores.
3. Se ha revisado en 375 px y 1440 px, en ambos temas y con teclado.
4. No introduce dependencias no aprobadas.
5. `docs/plan.md` y `docs/memoria.md` están actualizados; si hubo una decisión técnica, está registrada en `docs/decisiones.md`.

## 9. Reglas de trabajo

### Flujo

**Planificar → aprobar → implementar → validar → documentar.** No se pasa de una etapa a la siguiente sin aprobación explícita del propietario.

### Git

- Permitido sin consultar: comandos de solo lectura (`status`, `diff`, `log`, `show`, `branch`, `remote -v`).
- Requiere consentimiento explícito para cada acción concreta: `add`, `commit`, `push`, `merge`, `rebase`, crear/renombrar/borrar ramas o tags, cambiar remotos.
- Nunca sin autorización expresa: `reset --hard`, `clean -fd`, `checkout --`, `restore`, `branch -D`, `push --force`, `rm -rf`.
- No hacer commits «para guardar cambios».
- **El propietario ejecuta las operaciones Git que modifican el repositorio.** El agente le indica cuándo hacerlas y le da los comandos exactos: `git add` con los archivos concretos, `git commit -m` con el mensaje propuesto y cuándo hacer `git push`.

### Dependencias, sistema y servicios externos

- No instalar dependencias ni ejecutar scripts que modifiquen el sistema, la red o servicios externos sin autorización.
- No crear cuentas, desplegar ni contratar servicios sin consultar.
- Indicar el coste de cualquier propuesta; priorizar opciones gratuitas y locales.

### Datos y secretos

- No incluir secretos, credenciales, tokens ni datos personales en el repositorio.
- El CV original con datos completos va en `privado/` (ignorada por Git). Solo se publica la versión aprobada en `public/cv/` (ADR-012).
- Limpiar los metadatos de los PDF e imágenes antes de publicarlos.

### Información no decidida

No inventar: proponer opciones y marcar como `PENDIENTE`, registrándolo en `docs/decisiones.md`.

### Mantenimiento de la documentación

- `docs/memoria.md`: actualizar al final de cada sesión de trabajo.
- `docs/plan.md`: marcar tareas al completarlas.
- `docs/decisiones.md`: añadir o actualizar el ADR al tomar o cambiar una decisión.
- Este archivo: actualizar solo si cambian alcance, requisitos, stack, arquitectura, convenciones o reglas.
