import Header from '@/components/common/header/Header';
import './Profile.scss';
import { ProfileContent } from './ProfileContent';

const ProfilePage = () => {
  return (
      <main className="main page-background">
        <Header />
        <ProfileContent/>
      </main>
  );
};

export default ProfilePage;

