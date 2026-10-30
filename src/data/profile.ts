export interface ProfileLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  role: string;
  description: string;
  links: ProfileLink[];
}

// PENDIENTE: contenido del propietario (checklist de contenido en
// docs/plan.md). Enlaces a mostrar: ADR-013.
export const profile: Profile = {
  name: "Tu nombre",
  role: "Perfil profesional",
  description:
    "Portafolio personal: proyectos destacados y currículum descargable.",
  links: [],
};
