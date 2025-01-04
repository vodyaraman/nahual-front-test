'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { useUpdatePasswordMutation } from '@/state/profile/profileApi';
import StyledTypography from '@/components/common/StyledTypography';
import StyledButton from '@/components/common/StyledButton';
import FormInput from '@/components/common/form-input/FormInput';
import './Settings.scss';

const ProfileSettings: React.FC = () => {
  const user = useSelector((state: RootState) => state.profile.user);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [updatePassword] = useUpdatePasswordMutation();

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
    <article className="profile-settings">
      {user ? (
        <>
          <StyledTypography>Смена пароля</StyledTypography>
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
        </>
      ) : (
        <StyledTypography>Данные пользователя не найдены.</StyledTypography>
      )}
    </article>
  );
};

export default ProfileSettings;
