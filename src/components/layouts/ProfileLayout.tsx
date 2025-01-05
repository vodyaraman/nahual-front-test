import React, { useState, useEffect } from 'react';
import { useGetUserProfileQuery } from '@/state/profile/profileApi';
import { Alert, Snackbar } from '@mui/material';

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
    window.location.href="/auth?mode=login"
    return (
      <Snackbar>
        <Alert severity="error">
          Произошла ошибка при загрузке профиля. Попробуйте позже.
        </Alert>
      </Snackbar>
    )
  };

  return <>{children}</>;
};

export default ProfileLayout;
