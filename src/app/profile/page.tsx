'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import StyleLayout from '@/components/layouts/StyleLayout';
import Header from '@/components/common/Header';
import Background from '@/components/common/Background';
import ProfileSettings from './Settings';
import { useGetUserProfileQuery } from '@/state/profile/profileApi';

const ProfilePage = () => {
  const [value, setValue] = useState(0);
  const [retry, setRetry] = useState(false);

  // Используем RTK Query для загрузки профиля
  const { data: user, error, isLoading, refetch } = useGetUserProfileQuery(undefined, {
    skip: retry, // Используем `retry` для управления запросами
  });

  // Эффект для повторной загрузки в случае ошибки
  useEffect(() => {
    let retryTimeout: NodeJS.Timeout;

    const tryLoadProfile = () => {
      if (error || !user) {
        retryTimeout = setTimeout(() => {
          setRetry(false); // Сбрасываем `skip` для повторной попытки
          refetch(); // Вызываем повторный запрос
        }, 5000); // Повторная попытка каждые 5 секунд
      }
    };

    if (!isLoading && (error || !user)) {
      tryLoadProfile();
    }

    return () => {
      clearTimeout(retryTimeout);
    };
  }, [error, isLoading, user, refetch]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Компонент для табов
  const TabPanel = ({ children, value, index }: { children: React.ReactNode; value: number; index: number }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <Background />
      {value === index && (
        <Box sx={{ color: 'currentColor', width: 'auto', maxHeight: '80vh', overflowY: 'auto' }}>
          {children}
        </Box>
      )}
    </div>
  );

  return (
    <StyleLayout>
      <Header />
      <Box sx={{ width: '100%', height: '80px', top: '60px' }}>
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#000',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            paddingLeft: '5rem',
          }}
        >
          <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
            <Tab
              label="История"
              value={0}
              sx={{ color: 'white', fontSize: '0.75rem', '&.Mui-selected': { color: 'gold' } }}
            />
            <Tab label="Настройки" value={1} sx={{ color: 'white', fontSize: '0.75rem', '&.Mui-selected': { color: 'gold' } }} />
            <Tab label="Помощь" value={2} sx={{ color: 'white', fontSize: '0.75rem', '&.Mui-selected': { color: 'gold' } }} />
          </Tabs>
          <Box sx={{ padding: '1rem' }}>
            {isLoading ? (
              <Typography variant="body1" color="grey" textAlign="right">
                Загрузка...
              </Typography>
            ) : error ? (
              <Typography variant="body1" color="red" textAlign="right">
                Ошибка: {String(error)}
              </Typography>
            ) : user ? (
              <>
                <Typography variant="body1" color="white" textAlign="right">
                  {user.username}
                </Typography>
                <Typography variant="body2" color="grey" textAlign="right">
                  {user.email}
                </Typography>
              </>
            ) : (
              <Typography variant="body1" color="grey" textAlign="right">
                Нет данных о пользователе
              </Typography>
            )}
          </Box>
        </Box>
        <TabPanel value={value} index={0}>
          <Typography>Здесь будет отображаться история ваших предсказаний.</Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProfileSettings />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>Здесь вы найдете ответы на часто задаваемые вопросы.</Typography>
        </TabPanel>
      </Box>
    </StyleLayout>
  );
};

export default ProfilePage;
