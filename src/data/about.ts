export interface TimelineEntry {
  title: string;
  subtitle?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  inverted?: boolean;
  callout?: string[];
}

export const aboutTimeline: TimelineEntry[] = [
  {
    title: 'Enseñanza Media 2° a 4°',
    subtitle: 'Enseñanza media',
    body: 'Liceo Técnico Florencia Nightingale, La Serena. Especialidad en electrónica.',
    image: '/images/about/3.png',
    imageAlt: 'Icono de enseñanza media',
  },
  {
    title: '2010-2013',
    subtitle: 'Inacap La Serena',
    body: 'Ingeniería en Informática, sin mención',
    image: '/images/about/4.jpg',
    imageAlt: 'Icono de universidad',
    inverted: true,
  },
  {
    title: '',
    inverted: true,
    callout: ['Aún', 'estoy', 'joven!'],
  },
];
