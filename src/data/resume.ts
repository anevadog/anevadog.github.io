export interface ResumeEntry {
  title: string;
  organization: string;
  period: string;
  bullets?: string[];
}

export interface SkillGroup {
  name: string;
  note?: string;
  items: string[];
}

export interface Resume {
  /** PDF público en `public/cv/` (ADR-004, ADR-012). Sin definir: no hay botón de descarga. */
  pdf?: { file: string; downloadName: string };
  experience: ResumeEntry[];
  education: ResumeEntry[];
  skills: SkillGroup[];
  languages: { name: string; level: string }[];
  personalSkills: string[];
  additional: string[];
}

// Contenido revisado con el propietario el 2026-10-30 (ADR-015).
export const resume: Resume = {
  // PENDIENTE: el propietario añadirá el PDF a public/cv/.
  pdf: undefined,
  experience: [
    {
      title: "Fundador y Técnico de Soporte IT",
      organization: "SoftHard A&L",
      period: "2020–2024",
      bullets: [
        "Dirigí un servicio técnico propio de reparación y mantenimiento informático para más de 50 clientes, particulares y pequeñas empresas.",
        "Diagnostiqué y reparé ordenadores, portátiles, impresoras y servidores, incluida la reparación electrónica y microsoldadura de placas base.",
        "Presté soporte técnico remoto y presencial con AnyDesk y TeamViewer.",
        "Instalé y configuré sistemas operativos Windows 10/11, Windows Server, Linux y macOS.",
        "Administré la infraestructura informática de pequeñas empresas clientes: red local, copias de seguridad y cuentas de usuario.",
        "Atendí y asesoré técnicamente a clientes en la elección de equipos y en presupuestos de reparación.",
      ],
    },
    {
      title: "Técnico de Soporte IT / Service Desk",
      organization: "Neumática del Caribe",
      period: "2016–2020",
      bullets: [
        "Resolví incidencias de hardware y software de usuarios, en remoto y presencial.",
        "Instalé y configuré equipos informáticos, impresoras y dispositivos de red.",
        "Administré servidores Windows Server a nivel básico: alta de usuarios, permisos e impresoras en red con Active Directory.",
        "Realicé las copias de seguridad diarias de los datos en el servidor y gestioné las copias del servidor de antivirus Kaspersky.",
        "Di soporte a usuarios en Microsoft Office y Google Workspace.",
      ],
    },
  ],
  education: [
    {
      title: "CFGS Desarrollo de Aplicaciones Multiplataforma",
      organization: "CEAC",
      period: "2025–actualidad",
    },
  ],
  skills: [
    {
      name: "Soporte y sistemas",
      note: "Experiencia profesional · 8 años",
      items: [
        "Service Desk / Help Desk",
        "Soporte remoto y presencial",
        "Resolución de incidencias",
        "Diagnóstico y reparación de hardware",
        "Microsoldadura de placas base",
        "Windows, Linux y macOS",
        "Windows Server (básico)",
        "Active Directory",
        "Impresoras y dispositivos de red",
        "Copias de seguridad",
        "AnyDesk / TeamViewer",
        "Microsoft Office",
        "Google Workspace",
      ],
    },
    {
      name: "Desarrollo",
      note: "Formación DAM · nivel inicial",
      items: [
        "Java (POO: clases, herencia, interfaces, colecciones)",
        "SQL (básico)",
        "HTML y CSS (básico)",
        "Git y GitHub",
      ],
    },
    {
      name: "Tecnologías usadas en proyecto",
      note: "Con asistencia de IA",
      items: [
        "TypeScript",
        "Next.js",
        "React",
        "PostgreSQL",
        "Prisma",
        "Docker",
        "GitHub Actions (CI)",
        "Vitest",
      ],
    },
    {
      name: "Herramientas de IA para desarrollo",
      items: ["Claude Code", "OpenCode"],
    },
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "A2" },
  ],
  personalSkills: [
    "Resolución de problemas",
    "Atención al usuario",
    "Orientación al cliente",
    "Aprendizaje continuo",
  ],
  additional: [
    "Permiso de conducir B y vehículo propio",
    "Disponibilidad para desplazamientos",
  ],
};
