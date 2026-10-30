# Portafolio web personal

Portafolio personal de una sola página: presentación, proyectos destacados y currículum consultable y descargable en PDF. Diseño responsive con tema claro y oscuro.

> **Estado:** proyecto inicializado; las secciones todavía no están implementadas. Consulta [`docs/memoria.md`](docs/memoria.md).

## Stack

[Astro](https://astro.build) + TypeScript + Tailwind CSS v4. Sitio estático, sin backend. Detalle y justificación en [`AGENTS.md`](AGENTS.md) y [`docs/decisiones.md`](docs/decisiones.md).

## Requisitos

- Node.js 24 (ver `.nvmrc`)
- npm

## Puesta en marcha

```bash
npm install
```

```bash
npm run dev
```

Servidor de desarrollo en `http://localhost:4321`.

```bash
npm run build
```

Compila el sitio en `dist/`; antes ejecuta `astro check` y falla si hay errores de tipos.

```bash
npm run preview
```

Otros scripts: `npm run check` (solo comprobación de tipos), `npm run format` y `npm run format:check` (Prettier).

## Contenido

| Qué                             | Dónde                                            |
| ------------------------------- | ------------------------------------------------ |
| Perfil, textos y enlaces        | `src/data/profile.ts`                            |
| Proyectos destacados            | `src/data/projects.ts`                           |
| Capturas de proyectos           | `src/assets/projects/`                           |
| CV público (PDF)                | `public/cv/` (nombre del archivo: **PENDIENTE**) |
| CV original con datos completos | `privado/` (ignorada por Git, nunca se publica)  |

Antes de publicar el CV, revisa qué datos personales incluye y elimina sus metadatos (ver ADR-012 en `docs/decisiones.md`).

## Despliegue

**PENDIENTE** (ADR-003). Propuesta: GitHub Pages.

## Documentación

- [`AGENTS.md`](AGENTS.md): contexto, requisitos, arquitectura, convenciones y reglas.
- [`docs/plan.md`](docs/plan.md): fases y tareas.
- [`docs/memoria.md`](docs/memoria.md): estado actual.
- [`docs/decisiones.md`](docs/decisiones.md): decisiones técnicas.
