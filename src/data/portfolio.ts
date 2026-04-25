export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  image: string;
  alt: string;
  fullAlt: string;
  detailsLabel: string;
  intro: string;
  paragraphs: string[];
  featureIntro?: string;
  features?: string[];
  liveUrl?: string;
  liveLabel?: string;
  credentials?: string[];
  note?: string;
  meta: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'portfolioModal1',
    title: 'Vallesol',
    category: 'Web Development',
    thumbnail: '/images/portfolio/portafolio1_min.jpg',
    image: '/images/portfolio/portafolio1.jpg',
    alt: 'Captura de pantalla del proyecto Vallesol',
    fullAlt: 'Captura de pantalla completa del proyecto Vallesol',
    detailsLabel: 'Ver detalles del proyecto Vallesol',
    intro: 'Web empresarial de vallesol.cl',
    paragraphs: [
      'Este sitio web está montado sobre el framework Codeigniter (PHP), utilizando jquery, css y otros plugins de estilo, junto a animaciones. Es un sitio web estático, por lo que no tiene ninguna base de datos alimentando el contenido.',
    ],
    liveUrl: 'https://vallesol.cl/',
    liveLabel: 'Ver proyecto',
    meta: ['Fecha: Febrero 2016', 'Cliente: Consultora Vallesol', 'Categoría: Desarrollo web'],
  },
  {
    id: 'portfolioModal2',
    title: 'IoSento',
    category: 'Intranet-Web Development',
    thumbnail: '/images/portfolio/portafolio2_min.png',
    image: '/images/portfolio/portafolio2.png',
    alt: 'Captura de pantalla del proyecto IoSento',
    fullAlt: 'Captura de pantalla completa del proyecto IoSento',
    detailsLabel: 'Ver detalles del proyecto IoSento',
    intro: 'Intranet para empresa corredora de propiedades.',
    paragraphs: ['Este proyecto está desarrollado utilizando el framework de ruby, Ruby On Rails.'],
    featureIntro: 'Esta intranet comprende las siguientes características.',
    features: [
      'Notificaciones en navbar',
      'Notificaciones de escritorio',
      'Actividad de usuarios',
      'Generación dinámica y selectiva de PDFs.',
      'Lista de contactos con identificador de estado (conectado, ausente o desconctado)',
      'Mantenedor de solicitudes, corredores, usuarios y empresas',
      'Convertidor de divisas',
      'Perfil de usuario',
    ],
    liveUrl: 'https://iosento.cloudapp.net/',
    liveLabel: 'Ver proyecto',
    credentials: ['Usuario: demo@iosento.cl', 'Password: d3mous3r'],
    meta: ['Fecha: Octubre 2016', 'Cliente: IoSento', 'Categoría: Desarrollo web'],
  },
  {
    id: 'portfolioModal3',
    title: 'Acepro',
    category: 'Web Development',
    thumbnail: '/images/portfolio/portafolio3_min.png',
    image: '/images/portfolio/portafolio3.png',
    alt: 'Captura de pantalla del proyecto Acepro',
    fullAlt: 'Captura de pantalla completa del proyecto Acepro',
    detailsLabel: 'Ver detalles del proyecto Acepro',
    intro: 'Sitio web para proyecto de tesis.',
    paragraphs: [
      'Este sitio web fue un encargo para la defensa de un proyecto de tesis de unas alumnas de otra institución.',
    ],
    liveUrl: 'https://acepro.cl/',
    liveLabel: 'Ver proyecto',
    meta: ['Fecha: Marzo 2016', 'Categoría: Desarrollo web'],
  },
  {
    id: 'portfolioModal4',
    title: 'SGP',
    category: 'Intranet-Web Development',
    thumbnail: '/images/portfolio/portafolio4_min.png',
    image: '/images/portfolio/portafolio4.png',
    alt: 'Captura de pantalla del proyecto SGP',
    fullAlt: 'Captura de pantalla completa del proyecto SGP',
    detailsLabel: 'Ver detalles del proyecto SGP',
    intro: 'Sistema de procesamiento para planta de nueces.',
    paragraphs: [
      'Este proyecto está realizado utilizando el fraemwork php Codeigniter. Utiliza una base de datos mysql local, css y js para las animaciones.',
      'Este sistema permite la trazabilidad del producto desde la entrega en recepción, emitiendo un voucher imprimible y descargable, hasta el envío correspondiente al tipo de mercado al cual se distribuba. También, está la opción de ir controlando, mediante gráficos y reportes, en cada etapa del proceso.',
    ],
    featureIntro: 'Este sistema comprende las siguientes características.',
    features: [
      'Mantenedor de usuarios, variedades de nueces y proveedores.',
      'Generación de informes virtuales y descargables en Excel.',
      'Control de trazabilidad utilizando estados de producto.',
      'Gráficos dinámicos en página principal.',
    ],
    liveUrl: 'https://www.vallesol.cl/sgp/',
    liveLabel: 'Ver proyecto',
    credentials: ['Usuario: demo@vallesol.cl', 'Password: d3mous3r'],
    note: 'Nota: Este usuario no tiene acceso a la sección de administración, donde está la creación de usuarios, inserción de trabajadores, productores, especies y variedades del producto.',
    meta: ['Fecha: Marzo 2016', 'Cliente: Consultora Vallesol', 'Categoría: Desarrollo web'],
  },
  {
    id: 'portfolioModal5',
    title: 'Coding Cat',
    category: 'Web Development',
    thumbnail: '/images/portfolio/portafolio5_min.png',
    image: '/images/portfolio/portafolio5.png',
    alt: 'Captura de pantalla del proyecto Coding Cat',
    fullAlt: 'Captura de pantalla completa del proyecto Coding Cat',
    detailsLabel: 'Ver detalles del proyecto Coding Cat',
    intro: 'Sitio web, con intranet, para publicación de proyectos freelance.',
    paragraphs: [
      'Este proyecto lo desarrollé para publicar los proyectos que realicé junto a mis amigos o por mi cuenta. Está desarrollado en php, utilizando el framework Codeigniter (Se viene la versión 2.0 en Ruby On Rails). Tiene una base de datos remota de mysql, montada sobre azure.',
    ],
    liveUrl: 'https://codingcat.cl/',
    liveLabel: 'Codingcat.cl',
    meta: ['Fecha: Enero 2016', 'Categoría: Desarrollo web'],
  },
  {
    id: 'portfolioModal6',
    title: 'PenPen Store',
    category: 'Web Development - Intranet',
    thumbnail: '/images/portfolio/portafolio6_min.png',
    image: '/images/portfolio/portafolio6.png',
    alt: 'Captura de pantalla del proyecto PenPen Store',
    fullAlt: 'Captura de pantalla completa del proyecto PenPen Store',
    detailsLabel: 'Ver detalles del proyecto PenPen Store',
    intro:
      'Sitio web, con intranet, para publicación de productos, categorías, gestión de stock y diseño. Actualmente está en proceso de mejoras, por lo que se le agregarán medios de pago, gestión de ventas, más elementos para el control de diseño, etc.',
    paragraphs: [
      'Este proyecto lo realicé para publicar los productos que vendemos como Gatingüino PenPen. Está desarrollado en Ruby, utilizando el framework Ruby On Rails. Tiene una base de datos MySQL, montada sobre azure, en un servidor Ubuntu 16.',
    ],
    liveUrl: 'https://penpenstore.cl/',
    liveLabel: 'Penpenstore.cl',
    meta: ['Fecha: Septiembre 2017', 'Categoría: Desarrollo web'],
  },
];
