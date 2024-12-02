'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, Avatar, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { useUpdateUsernameMutation, useUpdateAvatarUrlMutation, useUpdatePasswordMutation } from '@/state/profile/profileApi';
import { setProfile } from '@/state/profile/profileSlice';

const ProfileSettings: React.FC = () => {
  const dispatch = useDispatch();

  // Данные профиля из Redux
  const user = useSelector((state: RootState) => state.profile.user);

  // Локальное состояние
  const [username, setUsername] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // Для нового пароля

  // RTK Query для изменения данных
  const [updateUsername, { isLoading: isUpdatingUsername, error: usernameError }] = useUpdateUsernameMutation();
  const [updateAvatarUrl, { isLoading: isUpdatingAvatar, error: avatarError }] = useUpdateAvatarUrlMutation();
  const [updatePassword, { isLoading: isUpdatingPassword, error: passwordError }] = useUpdatePasswordMutation();

  // Синхронизация начальных данных
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setAvatarUrl(user.avatarUrl || '/default-avatar.png');
    }
  }, [user]);

  // Обработчики изменений
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatarUrl(newAvatarUrl);

      try {
        await updateAvatarUrl({ avatarUrl: newAvatarUrl }).unwrap();
        if (user) {
          dispatch(setProfile({ ...user, avatarUrl: newAvatarUrl }));
        }
      } catch (err) {
        console.error('Ошибка обновления аватара:', err);
      }
    }
  };

  const handleSaveUsername = async () => {
    try {
      await updateUsername({ username }).unwrap();
      if (user) {
        dispatch(setProfile({ ...user, username }));
      }
      console.log('Имя пользователя обновлено');
    } catch (err) {
      console.error('Ошибка обновления имени пользователя:', err);
    }
  };

  const handleSavePassword = async () => {
    try {
      await updatePassword({ password }).unwrap();
      console.log('Пароль обновлён');
      setPassword(''); // Сброс поля пароля
    } catch (err) {
      console.error('Ошибка обновления пароля:', err);
    }
  };

  return (
    <Paper sx={{ padding: '10px 20px', width: 'auto', backgroundColor: '#000000ad', overflowY: 'visible' }}>
      <Typography variant="h6" gutterBottom>
        Настройки профиля
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: 2, gap: 2, maxWidth: '500px' }}>
        {user ? (
          <>
            {/* Аватар */}
            <Avatar src={avatarUrl} sx={{ width: 100, height: 100 }} />
            <Input
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={handleAvatarChange}
              disabled={isUpdatingAvatar}
            />
            {avatarError && (
              <Typography variant="body2" color="red">
                Ошибка обновления аватара
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              disabled={isUpdatingAvatar}
              sx={{
                width: '200px',
                fontSize: '0.7rem',
              }}
            >
              Сохранить аватар
            </Button>

            {/* Имя пользователя */}
            <TextField
              label="Имя пользователя"
              value={username}
              onChange={handleUsernameChange}
              disabled={isUpdatingUsername}
            />
            {usernameError && (
              <Typography variant="body2" color="red">
                Ошибка обновления имени пользователя
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveUsername}
              disabled={isUpdatingUsername}
              sx={{
                width: '200px',
                fontSize: '0.7rem',
              }}
            >
              Сохранить изменения
            </Button>

            {/* Пароль */}
            <TextField
              label="Новый пароль"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              disabled={isUpdatingPassword}
            />
            {passwordError && (
              <Typography variant="body2" color="red">
                Ошибка обновления пароля
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSavePassword}
              disabled={isUpdatingPassword || !password.trim()}
              sx={{
                width: '200px',
                fontSize: '0.7rem',
              }}
            >
              Сохранить пароль
            </Button>

            {/* Информация о подписке */}
            <Box sx={{ marginTop: 5, gap: 2, maxWidth: '500px' }}>
              <Typography variant="body1" gutterBottom>
                Здесь будет информация об оплате тарифов и возможность управлять подписками.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: '200px',
                  fontSize: '0.7rem',
                }}
              >
                Перейти к оплате
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="grey">
            Данные пользователя не найдены.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ProfileSettings;
