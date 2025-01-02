'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '@/state/auth/authApi';
import { setTokens } from '@/state/auth/authSlice';
import StyledButton from '@/components/common/StyledButton';
import StyledTypography from '@/components/common/StyledTypography';

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInputs>();
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const password = watch('password');

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const { username, email, password } = data;
      const response = await registerUser({ username, email, password }).unwrap();
      dispatch(setTokens(response));
      window.location.href = '/profile';
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <div className="registration-form-container">
      <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
        <StyledTypography>
          Регистрация
        </StyledTypography>

        {errors.username && (
          <div className="form-error global-error">
            {errors.username.message}
          </div>
        )}

        <div className="form-field">
          <input
            id="username"
            type="text"
            placeholder=" "
            {...register("username", { 
              required: "Username is required",
              minLength: { value: 3, message: "Username must be at least 3 characters" },
              maxLength: { value: 20, message: "Username cannot exceed 20 characters" }
            })}
          />
          <label htmlFor="username">
            {errors.username ? (
              <div className='form-error'>{errors.username.message}</div>
            ) : (
              <>Username</>
            )}
          </label>
        </div>

        <div className="form-field">
          <input
            id="email"
            type="email"
            placeholder=" "
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Enter a valid email address"
              }
            })}
          />
          <label htmlFor="email">
            {errors.email ? (
              <div className='form-error'>{errors.email.message}</div>
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
            {...register("password", { 
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              maxLength: { value: 32, message: "Password cannot exceed 32 characters" }
            })}
          />
          <label htmlFor="password">
            {errors.password ? (
              <div className='form-error'>{errors.password.message}</div>
            ) : (
              <>Password</>
            )}
          </label>
        </div>

        <div className="form-field">
          <input
            id="confirmPassword"
            type="password"
            placeholder=" "
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match"
            })}
          />
          <label htmlFor="confirmPassword">
            {errors.confirmPassword ? (
              <div className='form-error'>{errors.confirmPassword.message}</div>
            ) : (
              <>Confirm Password</>
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
          {isLoading ? 'Registering...' : 'Register'}
        </StyledButton>

        <div className="form-error global-error">
          {error && <>Registration failed. Please try again.</>}
        </div>
      </form>
    </div>
  );
}
