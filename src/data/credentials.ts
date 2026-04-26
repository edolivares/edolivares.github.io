export type CredentialType = 'course' | 'career';
export type CredentialStatus = 'completed' | 'in-progress';

export interface Credential {
  title: string;
  issuer: string;
  type: CredentialType;
  status: CredentialStatus;
  image?: string;
}

const desafioLatam = 'Desafío Latam';

export const credentials: Credential[] = [
  {
    title: 'HTML',
    issuer: desafioLatam,
    type: 'course',
    status: 'completed',
    image: '/images/credentials/desafio-latam/courses/html-course-certificate.webp',
  },
  {
    title: 'CSS',
    issuer: desafioLatam,
    type: 'course',
    status: 'completed',
    image: '/images/credentials/desafio-latam/courses/css-course-certificate.webp',
  },
  {
    title: 'CSS Avanzado',
    issuer: desafioLatam,
    type: 'course',
    status: 'completed',
    image: '/images/credentials/desafio-latam/courses/advanced-css-course-certificate.webp',
  },
  {
    title: 'JavaScript para la Web',
    issuer: desafioLatam,
    type: 'course',
    status: 'completed',
    image: '/images/credentials/desafio-latam/courses/javascript-for-the-web-course-certificate.webp',
  },
  {
    title: 'React',
    issuer: desafioLatam,
    type: 'course',
    status: 'completed',
    image: '/images/credentials/desafio-latam/courses/react-course-certificate.webp',
  },
  {
    title: 'SQL',
    issuer: desafioLatam,
    type: 'course',
    status: 'completed',
    image: '/images/credentials/desafio-latam/courses/sql-course-certificate.webp',
  },
  {
    title: 'Desarrollo Full Stack JavaScript',
    issuer: desafioLatam,
    type: 'career',
    status: 'in-progress',
  },
];
