import type { IconName } from "../components/ui/icons";

export interface ProfileLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  /** Nombre corto para la cabecera (`~/handle`). */
  handle: string;
  role: string;
  location: string;
  email: string;
  tagline: string;
  /** Descripción para buscadores y redes sociales. */
  description: string;
  links: ProfileLink[];
}

const email = "alex06ng@gmail.com";

// Datos publicados según ADR-012: sin teléfono.
export const profile: Profile = {
  name: "Alexander Nevado García",
  firstName: "Alexander",
  lastName: "Nevado García",
  handle: "alexander",
  role: "Técnico de Soporte IT · Estudiante de DAM",
  location: "Dos Hermanas (Sevilla)",
  email,
  tagline:
    "8 años resolviendo problemas técnicos en soporte IT. Ahora los resuelvo construyendo software.",
  description:
    "Portafolio de Alexander Nevado García: técnico de soporte IT con 8 años de experiencia y estudiante de Desarrollo de Aplicaciones Multiplataforma. Proyectos y currículum.",
  links: [
    { label: "GitHub", href: "https://github.com/anevadog", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/alexandernevado",
      icon: "linkedin",
    },
    { label: "Email", href: `mailto:${email}`, icon: "mail" },
  ],
};
