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
  loading: () => <LoadingSkeleton height="5rem" />,
});

const DynamicContent = dynamic(() => import('./LandingContent'), {
  loading: () => <LoadingSkeleton height="5rem" />,
});

// Метаданные текущей страницы
export const metadata = {
  title: 'Nahual Visions - Откройте своё будущее',
  description: 'Узнайте своё будущее с помощью ИИ, который анализирует жизненную линию руки и древние календари Майя. Уникальный инструмент предсказаний!',
  openGraph: {
    title: 'Nahual Visions - Узнайте своё будущее',
    description: 'Искусственный интеллект и древние знания Майя объединены для точных предсказаний. Ваше будущее на ладони!',
    url: 'https://nahualvisions.com',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Nahual Visions - Колесо предсказаний',
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
