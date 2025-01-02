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
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

        <StyledTypography>
          Вход в систему
        </StyledTypography>

        <div className="form-field">
          <input
            id="email"
            type="text"
            placeholder=" "
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Enter a valid email address',
              },
            })}
          />
          <label htmlFor="email">
            {errors.email ? (
              <div className='form-error'> {errors?.email?.message}</div>
            ) : (
              <>Email</>
            )}
          </label>
        </div>

        <div className="form-field">
          <input
            id="password"
            type="password"
            placeholder=" "
            {...register('password', { required: 'Password is required' })}
          />
          <label htmlFor="password">
            {errors.password ? (
              <div className='form-error'> {errors?.password?.message}</div>
            ) : (
              <>Password</>
            )}
          </label>
        </div>

        <StyledButton
          variant='contained'
          color='secondary'
          type="submit"
          disabled={isLoading}
          sx={{ color: '#000' }}
        >
          {isLoading ? 'Logging in...' : 'Continue'}
        </StyledButton>

        <div className="form-error global-error">
          {error && <>Login failed. Please check your credentials</>}
        </div>
      </form>
    </div>
  );
}
