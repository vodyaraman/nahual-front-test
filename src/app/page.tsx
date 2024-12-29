import dynamic from 'next/dynamic';
import Skeleton from '@mui/material/Skeleton';
import './landing.scss';

// Компонент для отображения скелетона
const LoadingSkeleton = ({ height }: { height: string | number }) => (
  <div className="loading-skeleton">
    <Skeleton variant="rectangular" width="100%" height={height} animation="wave" />
  </div>
);

// Динамическая загрузка компонентов
const DynamicHeader = dynamic(() => import('@/components/common/header/Header'), {
  loading: () => <LoadingSkeleton height="60px" />,
});

const DynamicContent = dynamic(() => import('./LandingContent'), {
  loading: () => <LoadingSkeleton height="60px" />,
});

// Уникальные метаданные для страницы
export const metadata = {
  title: 'Nahual Visions - главная страница',
  description: 'Это уникальное описание главной страницы для SEO.',
  openGraph: {
    title: 'Главная страница - Название сайта',
    description: 'Описание главной страницы для социальных сетей.',
    url: 'https://example.com',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Главная страница OG Image',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main className="main page-background">
      <DynamicHeader />
      <DynamicContent />
    </main>
  );
}
