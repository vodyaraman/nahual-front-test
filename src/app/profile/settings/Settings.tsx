'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, Avatar, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { useUpdateUsernameMutation, useUpdateAvatarUrlMutation, useUpdatePasswordMutation } from '@/state/profile/profileApi';
import { setProfile } from '@/state/profile/profileSlice';

const ProfileSettings: React.FC = () => {
  const BoxStyle = {
    display: 'flex',
    width: '50%',
    minWidth: '450px',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
    margin: '10px 0',
    padding: '30px',
    borderRadius: '25px',
    border: '1px solid #b58304',
    backdropFilter: 'blur(5px)',
    boxSizing: 'border-box'
  }

  const dispatch = useDispatch();

  // Данные профиля из Redux
  const user = useSelector((state: RootState) => state.profile.user);

  // Локальное состояние
  const [username, setUsername] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>(''); // Текущий пароль
  const [newPassword, setNewPassword] = useState<string>(''); // Новый пароль
  const [passwordError, setPasswordError] = useState<string | null>(null); // Ошибка пароля

  // RTK Query для изменения данных
  const [updateUsername, { isLoading: isUpdatingUsername, error: usernameError }] = useUpdateUsernameMutation();
  const [updateAvatarUrl, { isLoading: isUpdatingAvatar, error: avatarError }] = useUpdateAvatarUrlMutation();
  const [updatePassword, { isLoading: isUpdatingPassword, error: updatePasswordError }] = useUpdatePasswordMutation();

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

  const validatePassword = () => {
    if (newPassword.length < 8) {
      setPasswordError('Пароль должен содержать не менее 8 символов');
      return false;
    }
    if (newPassword.length > 32) {
      setPasswordError('Пароль не может содержать более 32 символов');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleSavePassword = async () => {
    if (!validatePassword()) return;

    try {
      await updatePassword({ currentPassword, newPassword }).unwrap();
      console.log('Пароль обновлён');
      setCurrentPassword(''); // Сброс текущего пароля
      setNewPassword(''); // Сброс нового пароля
    } catch (err) {
      console.error('Ошибка обновления пароля:', err);
    }
  };

  return (
    <Paper sx={{ width: 'auto', backgroundColor: '#000000ad', overflow: 'hidden' }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2, gap: 2, maxWidth: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Настройки профиля
        </Typography>
        {user ? (
          <>
            <Box sx={BoxStyle}>
              {/* Аватар */}
              <Typography variant="h6" gutterBottom>
                Аватар
              </Typography>
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
            </Box>

            <Box sx={BoxStyle}>
              <Typography variant="h6" gutterBottom>
                Имя пользователя
              </Typography>
              {/* Имя пользователя */}
              <TextField
                label="Имя пользователя"
                value={username}
                onChange={handleUsernameChange}
                disabled={isUpdatingUsername}
                sx={{width: '100%'}}
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
            </Box>
            <Box sx={BoxStyle}>
              <Typography variant="h6" gutterBottom>
                Пароль
              </Typography>
              {/* Пароль */}
              <TextField
                label="Текущий пароль"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="password"
                disabled={isUpdatingPassword}
                sx={{width: '100%'}}
              />
              <TextField
                label="Новый пароль"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                error={!!passwordError}
                helperText={passwordError}
                disabled={isUpdatingPassword}
                sx={{width: '100%'}}
              />
              {updatePasswordError && (
                <Typography variant="body2" color="red">
                  Ошибка обновления пароля
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSavePassword}
                disabled={isUpdatingPassword || !currentPassword.trim() || !newPassword.trim()}
                sx={{
                  width: '200px',
                  fontSize: '0.7rem',
                }}
              >
                Сохранить пароль
              </Button>
            </Box>
            {/* Информация о подписке */}
            <Box sx={{ ...BoxStyle, marginBottom: '20px'}}>
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
