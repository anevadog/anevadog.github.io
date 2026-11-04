import type { ImageMetadata } from "astro";
import cocinaImage from "../assets/projects/cocina.png";
import softhardImage from "../assets/projects/softhard-al.png";
import { profile } from "./profile";

export type ProjectRepo = { url: string } | { private: true };

export interface PublishedProject {
  status: "published";
  title: string;
  subtitle: string;
  year: string;
  description: string;
  highlights: string[];
  tech: string[];
  repo: ProjectRepo;
  demoUrl?: string;
  /** Captura en `src/assets/projects/`; sin ella se muestra un motivo abstracto. */
  image?: ImageMetadata;
  imageAlt?: string;
}

export interface UpcomingProject {
  status: "upcoming";
}

export type Project = PublishedProject | UpcomingProject;

export function requestAccessHref(project: PublishedProject): string {
  const subject = `Acceso al repositorio de ${project.title}`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;
}

// RF-03 / RF-04. Cifras confirmadas en ADR-015. Los proyectos «upcoming» se
// sustituyen cuando el propietario publique sus repositorios.
export const projects: Project[] = [
  {
    status: "published",
    title: "SoftHard A&L",
    subtitle: "Aplicación web de gestión de un taller de reparación",
    year: "2026",
    description:
      "Aplicación full stack que digitaliza el ciclo de un servicio técnico: solicitudes de reparación, presupuestos, tienda online con carrito, panel de taller con fichajes, facturación simulada y dashboard de ingresos. Todos los datos son ficticios.",
    highlights: [
      "Requisitos y flujo de trabajo definidos a partir de mi experiencia dirigiendo un servicio técnico real, organizados en 5 fases con especificaciones.",
      "Desarrollo dirigido por fases con agentes de IA (Claude Code, OpenCode): revisé y probé cada entrega y gestioné el control de versiones con Git y GitHub.",
      "609 tests unitarios y 106 de integración, ejecutados en integración continua en cada push.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Auth.js",
      "Zod",
      "Vitest",
      "GitHub Actions",
    ],
    repo: { url: "https://github.com/anevadog/softhard-al" },
    demoUrl: "https://softhard-al.vercel.app",
    image: softhardImage,
    imageAlt:
      "Página de inicio de SoftHard A&L: titular del servicio técnico, botones de registro e inicio de sesión y una tarjeta con el seguimiento de una solicitud en reparación",
  },
  {
    status: "published",
    title: "Cocina",
    subtitle: "API REST para la gestión de la cocina de un restaurante",
    year: "2026",
    description:
      "API que controla el almacén, el coste real de cada plato y la producción diaria de una cocina profesional: inventario por lotes con caducidades, recetas versionadas con coste por ración, plan de producción, temperaturas, mermas e incidencias. Todos los datos son ficticios.",
    highlights: [
      "El coste por ración se congela al publicar cada versión de una receta, de modo que una subida de precio del proveedor no altera el histórico.",
      "Descuento de stock atómico: con varios cocineros produciendo a la vez, el almacén nunca queda en negativo, y cada operación queda en una auditoría protegida por un trigger.",
      "247 tests automáticos, con los de integración sobre PostgreSQL real (Testcontainers), y un test de arquitectura que impide saltarse las fronteras entre módulos.",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Flyway",
      "JWT",
      "Testcontainers",
      "Docker",
      "GitHub Actions",
      "Caddy",
    ],
    repo: { url: "https://github.com/anevadog/cocina" },
    demoUrl: "https://anevadog.github.io/cocina/",
    image: cocinaImage,
    imageAlt:
      "Recorrido visual de Cocina, paso «Receta»: la versión 1 de la salsa de tomate conserva su coste congelado de 1,29 € por ración y la versión 2 sube a 1,49 € tras encarecerse el tomate",
  },
  { status: "upcoming" },
];
