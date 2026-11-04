# Portafolio web personal

Portafolio de una sola página con presentación, «Sobre mí», proyectos destacados y currículum. Diseño responsive con tema claro y oscuro.

**Web publicada:** https://anevadog.github.io/

## Características

- Sitio estático sin backend, sin cookies y sin peticiones a terceros (fuentes autoalojadas).
- Tema claro y oscuro que respeta la preferencia del sistema, recuerda la elección y no parpadea al cargar.
- Accesibilidad WCAG 2.2 AA: contraste verificado en ambos temas, navegación por teclado y `prefers-reduced-motion`.
- Lighthouse 100 en móvil y escritorio.
- JavaScript mínimo: scripts nativos en TypeScript, sin framework de UI.
- Contenido separado del marcado: los proyectos y el CV son datos tipados.

## Stack

[Astro](https://astro.build) + TypeScript estricto + Tailwind CSS v4, con fuentes Geist autoalojadas (Fontsource). Las decisiones técnicas, con sus alternativas, están en [`docs/decisiones.md`](docs/decisiones.md).

## Estructura

```
src/
├── assets/projects/   capturas de los proyectos (optimizadas con astro:assets)
├── components/
│   ├── layout/        cabecera, pie y selector de tema
│   ├── sections/      Hero, Sobre mí, Proyectos y CV
│   └── ui/            botones, tarjetas, etiquetas e iconos
├── data/              perfil, proyectos y currículum
├── layouts/           metadatos, SEO y script de tema
├── pages/             index y 404
├── scripts/           tema y aparición al hacer scroll
└── styles/            tokens de diseño y temas
```

## Puesta en marcha

Requisitos: Node.js 24 (ver `.nvmrc`) y npm.

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

| Qué                                 | Dónde                                     |
| ----------------------------------- | ----------------------------------------- |
| Perfil, enlaces y descripción SEO   | `src/data/profile.ts`                     |
| Proyectos destacados                | `src/data/projects.ts`                    |
| Capturas de proyectos (16:9)        | `src/assets/projects/`                    |
| Currículum (experiencia, formación) | `src/data/resume.ts`                      |
| Textos de cada sección              | `src/components/sections/`                |
| CV público en PDF                   | `public/cv/` y campo `pdf` de `resume.ts` |

## Despliegue

GitHub Pages mediante GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). Cada `push` a `main` compila y publica el sitio.
