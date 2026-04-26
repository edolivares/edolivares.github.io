export interface SocialLink {
  label: string;
  icon: 'twitter' | 'facebook' | 'linkedin' | 'github';
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
    'Soy ingeniero en informática y Full Stack Developer con experiencia construyendo aplicaciones web, APIs, intranets, integraciones y soluciones digitales para distintos contextos de negocio. Actualmente trabajo en software educativo, combinando desarrollo, arquitectura, optimización y colaboración con equipos multidisciplinarios. Me motivan los proyectos donde la tecnología resuelve problemas reales, mejora procesos y abre espacio para crear productos útiles, mantenibles y con impacto.',
};

export const socialLinks: SocialLink[] = [
  {
    label: 'Twitter',
    icon: 'twitter',
    href: 'https://twitter.com/EdoOlivares',
    ariaLabel: 'Perfil de Twitter',
  },
  {
    label: 'Facebook',
    icon: 'facebook',
    href: 'https://www.facebook.com/edo.olivares.o',
    ariaLabel: 'Perfil de Facebook',
  },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/edoolivares',
    ariaLabel: 'Perfil de LinkedIn',
  },
  {
    label: 'GitHub',
    icon: 'github',
    href: 'https://github.com/edolivares',
    ariaLabel: 'Perfil de GitHub',
  },
];
