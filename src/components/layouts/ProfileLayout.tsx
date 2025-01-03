import React, { useState, useEffect } from 'react';
import { useGetUserProfileQuery } from '@/state/profile/profileApi';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  const [retry, setRetry] = useState(false);
  const { error, isLoading, refetch } = useGetUserProfileQuery(undefined, {
    skip: retry,
  });

  useEffect(() => {
    let retryTimeout: NodeJS.Timeout;

    const tryLoadProfile = () => {
      if (error) {
        retryTimeout = setTimeout(() => {
          setRetry(false);
          refetch();
        }, 5000);
      }
    };

    if (!isLoading && error) {
      tryLoadProfile();
    }

    return () => {
      clearTimeout(retryTimeout);
    };
  }, [error, isLoading, refetch]);

  if (error) {
    return <div>Произошла ошибка при загрузке профиля. Попробуйте позже.</div>;
  }

  return <>{children}</>;
};

export default ProfileLayout;
