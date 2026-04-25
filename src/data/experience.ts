export interface TechItem {
  name: string;
  icon?: string;
  iconAlt?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  period: string;
  previewTech: TechItem[];
  moreCount?: number;
  responsibilities: string[];
  technologies: TechItem[];
  achievements?: string[];
}

const simpleIcon = (name: string) => `https://cdn.simpleicons.org/${name}`;

export const experiences: ExperienceItem[] = [
  {
    id: 'experienceModal1',
    company: 'OrionSystems LTDA',
    title: 'FULL STACK DEVELOPER',
    period: 'Mayo 2018 - Actualidad',
    previewTech: [
      { name: 'PHP', icon: simpleIcon('php'), iconAlt: 'PHP' },
      { name: 'Laravel', icon: simpleIcon('laravel'), iconAlt: 'Laravel' },
      { name: 'Vue.js', icon: simpleIcon('vuedotjs'), iconAlt: 'Vue.js' },
      { name: 'AWS', icon: '/images/icons/aws.png', iconAlt: 'AWS' },
    ],
    moreCount: 5,
    responsibilities: [
      'Desarrollo full-stack de aplicaciones web empresariales',
      'Diseño y arquitectura de bases de datos',
      'Implementación de APIs RESTful',
      'Optimización de rendimiento y escalabilidad',
      'Mentoría a desarrolladores junior',
      'Desarrollo de juegos interactivos utilizando Unity como motor gráfico',
      'Monitorización y supervisión del estado operativo de las aplicaciones en producción',
    ],
    technologies: [
      { name: 'HTML5', icon: simpleIcon('html5'), iconAlt: 'HTML5' },
      { name: 'CSS', icon: simpleIcon('css'), iconAlt: 'CSS' },
      { name: 'JavaScript', icon: simpleIcon('javascript'), iconAlt: 'JavaScript' },
      { name: 'Vue.js', icon: simpleIcon('vuedotjs'), iconAlt: 'Vue.js' },
      { name: 'React', icon: simpleIcon('react'), iconAlt: 'React' },
      { name: 'Unity', icon: 'https://cdn.simpleicons.org/unity/black', iconAlt: 'Unity' },
      { name: 'PHP', icon: simpleIcon('php'), iconAlt: 'PHP' },
      { name: 'Laravel', icon: simpleIcon('laravel'), iconAlt: 'Laravel' },
      { name: '.NET', icon: simpleIcon('dotnet'), iconAlt: '.NET' },
      { name: 'Node.js', icon: simpleIcon('nodedotjs'), iconAlt: 'Node.js' },
      { name: 'MySQL', icon: simpleIcon('mysql'), iconAlt: 'MySQL' },
      { name: 'AWS', icon: '/images/icons/aws.png', iconAlt: 'AWS' },
      { name: 'Cloudflare', icon: simpleIcon('cloudflare'), iconAlt: 'Cloudflare' },
      { name: 'Docker', icon: simpleIcon('docker'), iconAlt: 'Docker' },
      { name: 'Git', icon: simpleIcon('git'), iconAlt: 'Git' },
      { name: 'GitHub', icon: simpleIcon('github'), iconAlt: 'GitHub' },
    ],
    achievements: [
      'Reducción del tiempo de deploy en un 60% mediante implementación de CI/CD.',
      'Mejora del rendimiento de aplicaciones web en un 40% mediante optimización de consultas y caché.',
      'Optimización de flujos críticos de aplicaciones utilizando modelos de machine learning.',
      'Implementación de pruebas de integración y unitarias en API principal.',
      'Implementación de sistema de licenciamiento para juegos Unity basado en web tokens.',
    ],
  },
  {
    id: 'experienceModal2',
    company: 'FREELANCE',
    title: 'SOFTWARE DEVELOPER',
    period: 'Abril 2017 - Agosto 2017',
    previewTech: [
      { name: 'PHP', icon: simpleIcon('php'), iconAlt: 'PHP' },
      { name: 'CodeIgniter', icon: simpleIcon('codeigniter'), iconAlt: 'CodeIgniter' },
      { name: '.NET', icon: simpleIcon('dotnet'), iconAlt: '.NET' },
    ],
    moreCount: 4,
    responsibilities: [
      'Desarrollo de sistema para recepción, control y gestión de productos agrícolas.',
      'Desarrollo de sistema para gestión inmobiliaria.',
      'Desarrollo de e-commerce con integración de webpay y mercadopago. (Prestashop)',
      'Desarrollo de sitio web con Wordpress.',
      'Desarrollo software escritorio con integración de pesa electrónica.',
    ],
    technologies: [
      { name: 'PHP', icon: simpleIcon('php'), iconAlt: 'PHP' },
      { name: 'CodeIgniter', icon: simpleIcon('codeigniter'), iconAlt: 'CodeIgniter' },
      { name: 'Microsoft Azure', icon: '/images/icons/azure.png', iconAlt: 'Microsoft Azure' },
      { name: 'CSS', icon: simpleIcon('css'), iconAlt: 'CSS' },
      { name: 'Ruby on Rails', icon: simpleIcon('rubyonrails'), iconAlt: 'Ruby on Rails' },
      { name: '.NET', icon: simpleIcon('dotnet'), iconAlt: '.NET' },
    ],
  },
  {
    id: 'experienceModal3',
    company: 'Metalmar',
    title: 'SOPORTE INFORMÁTICO (Práctica profesional)',
    period: 'Diciembre 2012 - Marzo 2013',
    previewTech: [{ name: '.NET', icon: simpleIcon('dotnet'), iconAlt: '.NET' }],
    responsibilities: [
      'Configuración, y mantención, de computadores.',
      'Desarrollo de software.',
      'Soporte técnico a usuarios.',
    ],
    technologies: [{ name: '.NET', icon: simpleIcon('dotnet'), iconAlt: '.NET' }],
  },
];
