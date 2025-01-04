import Header from '@/components/common/header/Header';
import './Profile.scss';
import dynamic from 'next/dynamic';
import { Skeleton } from '@mui/material';

const DynamicContent = dynamic(() => import('./ProfileContent'), {
  loading: () => <Skeleton height="5rem" />,
});

const ProfilePage = () => {
  return (
      <main className="main page-background">
        <Header />
        <DynamicContent/>
      </main>
  );
};

export default ProfilePage;

