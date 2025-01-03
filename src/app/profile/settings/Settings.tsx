'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { useUpdateUsernameMutation, useUpdateAvatarUrlMutation, useUpdatePasswordMutation } from '@/state/profile/profileApi';
import { setProfile } from '@/state/profile/profileSlice';
import StyledTypography from '@/components/common/StyledTypography';
import StyledButton from '@/components/common/StyledButton';
import Image from 'next/image';
import FormInput from '@/components/common/FormInput';
import './Settings.scss';

const ProfileSettings: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile.user);

  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [updateUsername] = useUpdateUsernameMutation();
  const [updateAvatarUrl] = useUpdateAvatarUrlMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setAvatarUrl(user.avatarUrl || '/default-avatar.png');
    }
  }, [user]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatarUrl(newAvatarUrl);
      try {
        await updateAvatarUrl({ avatarUrl: newAvatarUrl }).unwrap();
        if (user) {
          dispatch(setProfile({ ...user, avatarUrl: newAvatarUrl }));
        }
      } catch (error) {
        console.error('Ошибка обновления аватара:', error);
      }
    }
  };

  const handleSaveUsername = async () => {
    if (!username.trim()) {
      setUsernameError('Имя пользователя не может быть пустым');
      return;
    }
    setUsernameError(null);
    try {
      await updateUsername({ username }).unwrap();
      if (user) {
        dispatch(setProfile({ ...user, username }));
      }
    } catch (error) {
      console.error('Ошибка обновления имени пользователя:', error);
    }
  };

  const handleSavePassword = async () => {
    if (newPassword.length < 8 || newPassword.length > 32) {
      setPasswordError('Пароль должен содержать от 8 до 32 символов');
      return;
    }
    setPasswordError(null);
    try {
      await updatePassword({ currentPassword, newPassword }).unwrap();
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Ошибка обновления пароля:', error);
    }
  };

  return (
    <div className="profile-settings">
      <StyledTypography>Настройки профиля</StyledTypography>
      {user ? (
        <>
          {/* Секция аватара */}
          <div className="profile-settings__section">
            <StyledTypography>Аватар</StyledTypography>
            <Image
              src={avatarUrl}
              alt="Аватар пользователя"
              width={100}
              height={100}
              className="profile-settings__avatar"
            />
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            <StyledButton variant="outlined" color="primary">
              Сохранить аватар
            </StyledButton>
          </div>

          {/* Секция имени пользователя */}
          <div className="profile-settings__section">
            <StyledTypography>Имя пользователя</StyledTypography>
            <FormInput
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError || ''}
              label="Имя пользователя"
            />
            <StyledButton variant="outlined" color="primary" onClick={handleSaveUsername}>
              Сохранить изменения
            </StyledButton>
          </div>

          {/* Секция пароля */}
          <div className="profile-settings__section">
            <StyledTypography>Пароль</StyledTypography>
            <FormInput
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              error=""
              label="Текущий пароль"
            />
            <FormInput
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={passwordError || ''}
              label="Новый пароль"
            />
            <StyledButton variant="outlined" color="primary" onClick={handleSavePassword}>
              Сохранить пароль
            </StyledButton>
          </div>
        </>
      ) : (
        <StyledTypography>Данные пользователя не найдены.</StyledTypography>
      )}
    </div>
  );
};

export default ProfileSettings;
