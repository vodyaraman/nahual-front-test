/* eslint-disable @next/next/no-img-element */
import React from 'react';
import './Auth.scss'
import { Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';

const LoadingSkeleton = ({ height }: { height: string | number }) => (
    <div className="loading-skeleton">
      <Skeleton variant="rectangular" width="100%" height={height} animation="wave" />
    </div>
  );
// Динамическая загрузка компонентов
const DynamicHeader = dynamic(() => import('@/components/common/header/Header'), {
  loading: () => <LoadingSkeleton height="60px" />,
});

const DynamicContent = dynamic(() => import('./AuthContent'), {
  loading: () => <LoadingSkeleton height="60px" />,
});

export const metadata = {
  title: 'Nahual Visions - Авторизация',
  description: 'Страница авторизации и регистрации на платформе Nahual Visions.',
  openGraph: {
    title: 'Nahual Visions - Авторизация',
    description: 'Войдите или зарегистрируйтесь, чтобы открыть доступ к предсказаниям.',
    url: 'https://nahualvisions.com/auth',
    images: [
      {
        url: '/og-auth.jpg',
        width: 1200,
        height: 630,
        alt: 'Страница авторизации Nahual Visions',
      },
    ],
  },
};

export default function Auth() {
  return (
    <main className="auth-container">
      <DynamicHeader />
      <DynamicContent />
    </main>
  );
}
