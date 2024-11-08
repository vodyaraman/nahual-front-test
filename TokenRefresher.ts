import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRefreshTokenMutation } from './src/state/auth/authApi';
import { refreshTokensSuccess } from './src/state/auth/authSlice';

const TokenRefresher = () => {
    const dispatch = useDispatch();
    const { refreshToken } = useSelector((state) => state.auth);
    const [refreshTokenMutation] = useRefreshTokenMutation();
  
    useEffect(() => {
      const intervalId = setInterval(async () => {
        if (refreshToken) {
          try {
            const result = await refreshTokenMutation({ refreshToken }).unwrap();
            dispatch(refreshTokensSuccess({ accessToken: result.accessToken, refreshToken: result.refreshToken }));
          } catch (error) {
            console.error('Ошибка обновления токена:', error);
          }
        }
      }, 1000 * 60 * 5); // Обновляем токен каждые 5 минут
  
      return () => clearInterval(intervalId);
    }, [refreshToken, dispatch, refreshTokenMutation]);
  
    return null;
  };
  
  export default TokenRefresher;
