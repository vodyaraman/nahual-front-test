'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/state/auth/authApi';
import { setTokens } from '@/state/auth/authSlice';
import StyledButton from '@/components/common/StyledButton';
import StyledTypography from '@/components/common/StyledTypography';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login({ username: '', email: data.email, password: data.password }).unwrap();
      dispatch(setTokens(response));

      window.location.href = '/profile';
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="login-form-container">
      <StyledTypography>
        Вход в систему
      </StyledTypography>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="email">Email<div className="form-error">{errors.password && <>{errors.password.message}</>}</div></label>
          <input
            id="email"
            type="text"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Enter a valid email address',
              },
            })}
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <div className="form-error">{errors.password && <>{errors.password.message}</>}</div>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
        </div>

        <div className="form-error global-error">
          {error && <>Login failed. Please check your credentials</>}
        </div>

        <StyledButton
          variant='contained'
          color='secondary'
          type="submit"
          disabled={isLoading}
          sx={{ color: '#000' }}>
          {isLoading ? 'Logging in...' : 'Continue'}
        </StyledButton>
      </form>
    </div>
  );
}
