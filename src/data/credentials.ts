export type CredentialType = 'course' | 'career';
export type CredentialStatus = 'completed' | 'in-progress';

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  type: CredentialType;
  status: CredentialStatus;
  program?: string;
  image?: string;
}

const desafioLatam = 'Desafío Latam';

export const credentials: Credential[] = [
  {
    id: 'html-course',
    title: 'HTML',
    issuer: desafioLatam,
    type: 'course',
    status: 'completed',
    image: '/images/credentials/desafio-latam/courses/html-course-certificate.webp',
  },
  {
    id: 'advanced-css-course',
    title: 'CSS Avanzado',
    issuer: desafioLatam,
    type: 'course',
    status: 'completed',
    image: '/images/credentials/desafio-latam/courses/advanced-css-course-certificate.webp',
  },
  {
    id: 'javascript-for-the-web-course',
    title: 'JavaScript para la Web',
    issuer: desafioLatam,
    type: 'course',
    status: 'completed',
    image: '/images/credentials/desafio-latam/courses/javascript-for-the-web-course-certificate.webp',
  },
  {
    id: 'react-course',
    title: 'React',
    issuer: desafioLatam,
    type: 'course',
    status: 'completed',
    image: '/images/credentials/desafio-latam/courses/react-course-certificate.webp',
  },
  {
    id: 'sql-course',
    title: 'SQL',
    issuer: desafioLatam,
    type: 'course',
    status: 'completed',
  },
  {
    id: 'backend-node-express-course',
    title: 'Backend con Node y Express',
    issuer: desafioLatam,
    type: 'course',
    status: 'in-progress',
  },
  {
    id: 'frontend-career',
    title: 'Desarrollo Front End',
    issuer: desafioLatam,
    type: 'career',
    status: 'completed',
    image: '/images/credentials/desafio-latam/careers/frontend-career-certificate.webp',
  },
  {
    id: 'fullstack-javascript-career',
    title: 'Desarrollo Full Stack JavaScript',
    issuer: desafioLatam,
    type: 'career',
    status: 'in-progress',
  },
];
