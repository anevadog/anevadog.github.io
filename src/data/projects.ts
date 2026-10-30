import type { ImageMetadata } from "astro";
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
    repo: { private: true },
  },
  { status: "upcoming" },
  { status: "upcoming" },
];
