import Header from '@/components/common/header/Header';
import './Profile.scss';
import dynamic from 'next/dynamic';
import { Skeleton } from '@mui/material';

const DynamicContent = dynamic(() => import('./ProfileContent'), {
  loading: () => <Skeleton height="5rem" />,
});

export const metadata = {
  title: 'Nahual Visions - Ваш Профиль',
  description: 'Просмотрите свои персонализированные предсказания, основанные на анализе вашей жизненной линии и знаниях древних Майя.',
  openGraph: {
    title: 'Nahual Visions - Ваш Профиль',
    description: 'Персональные предсказания, созданные на основе анализа вашей жизненной линии и майянских календарей. Уникальный взгляд в будущее!',
    url: 'https://nahualvisions.ru/profile',
    images: [
      {
        url: '/og-profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Nahual Visions - Ваш профиль',
      },
    ],
  },
};


const ProfilePage = () => {
  return (
      <main className="main page-background">
        <Header />
        <DynamicContent/>
      </main>
  );
};

export default ProfilePage;

