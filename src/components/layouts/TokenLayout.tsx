'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/state/store';
import { useRefreshTokenMutation } from '@/state/auth/authApi';
import { setTokens, logout } from '@/state/auth/authSlice';
import { safeLocalStorage } from '@/helpers/safeLocalStorage';
import { Box, Typography } from '@mui/material';

interface TokenLayoutProps {
  children: React.ReactNode;
}

const TokenLayout: React.FC<TokenLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const refreshTokenFromState = useSelector((state: RootState) => state.user.refreshToken);
  const [refreshAccessToken] = useRefreshTokenMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryInterval, setRetryInterval] = useState<number>(5 * 60 * 1000);

  useEffect(() => {
    // Инициализация токенов из safeLocalStorage
    const accessToken = safeLocalStorage.getItem('accessToken');
    const refreshToken = safeLocalStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      dispatch(setTokens({ accessToken, refreshToken }));
    }
  }, [dispatch]);

  useEffect(() => {
    const refreshToken = refreshTokenFromState || safeLocalStorage.getItem('refreshToken');
    if (!refreshToken) return;

    const sendRefreshRequest = async () => {
      try {
        const result = await refreshAccessToken({ refreshToken }).unwrap();
        dispatch(setTokens(result));
        setErrorMessage(null);
        setRetryInterval(1 * 60 * 1000); // Сбрасываем интервал на 5 минут
      } catch (error: unknown) {
        console.error('Ошибка обновления токена:', error);

        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as { status: number }).status;

          if (status === 500) {
            setErrorMessage('Проблемы на стороне сервера при обновлении данных');
            setRetryInterval(10 * 60 * 1000); // Увеличиваем интервал до 10 минут
          } else if (status === 401) {
            setErrorMessage('Refresh токен истёк. Выполняем выход.');
            dispatch(logout()); // Логаут при истечении refresh токена
          } else {
            setErrorMessage('Проблемы с соединением');
            setRetryInterval(10 * 1000); // Уменьшаем интервал до 10 секунд
          }
        } else {
          setErrorMessage('Неизвестная ошибка. Проблемы с соединением.');
          setRetryInterval(10 * 1000); // Уменьшаем интервал до 10 секунд
        }
      }
    };

    const refreshInterval = setInterval(sendRefreshRequest, retryInterval);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [refreshTokenFromState, dispatch, refreshAccessToken, retryInterval]);

  return (
    <>
      {children}
      {errorMessage && (
        <Box
          sx={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#f44336',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="body2">{errorMessage}</Typography>
        </Box>
      )}
    </>
  );
};

export default TokenLayout;
