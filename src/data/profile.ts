export interface SocialLink {
  label: string;
  shortLabel: string;
  href: string;
  ariaLabel: string;
}

export const profile = {
  name: 'Eduardo Olivares',
  image: '/images/team/eo_thumb.webp',
  imageAlt: 'Foto de Eduardo Olivares',
  degree: 'Ingeniero en Informática',
  role: 'Full Stack Developer',
  summary:
    'Actualmente formo parte de una empresa de desarrollo de software educativo, donde canalizo mi experiencia y entusiasmo en crear soluciones que aporten valor real. Disfruto trabajar en equipo porque potencia el aprendizaje, impulsa la innovación y convierte cada proyecto en una oportunidad para crecer. Me motivan los desafíos que invitan a explorar nuevas ideas y tecnologías para transformar procesos y dar vida a propuestas creativas.',
};

export const socialLinks: SocialLink[] = [
  {
    label: 'Twitter',
    shortLabel: 'Tw',
    href: 'https://twitter.com/EdoOlivares',
    ariaLabel: 'Perfil de Twitter',
  },
  {
    label: 'Facebook',
    shortLabel: 'Fb',
    href: 'https://www.facebook.com/edo.olivares.o',
    ariaLabel: 'Perfil de Facebook',
  },
  {
    label: 'LinkedIn',
    shortLabel: 'In',
    href: 'https://www.linkedin.com/in/edoolivares',
    ariaLabel: 'Perfil de LinkedIn',
  },
  {
    label: 'GitHub',
    shortLabel: 'Gh',
    href: 'https://github.com/edolivares',
    ariaLabel: 'Perfil de GitHub',
  },
];
