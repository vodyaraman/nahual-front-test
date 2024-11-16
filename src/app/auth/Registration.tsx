import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '@/state/auth/authApi';
import { setTokens, setUser } from '@/state/auth/authSlice';

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
      dispatch(setUser({
        id: response.accessToken,
        username,
        email,
      }));
      console.log('Registration successful');
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  // Функция для извлечения первого сообщения об ошибке
  const getFirstErrorMessage = () => {
    if (errors.username) return String(errors.username.message);
    if (errors.email) return String(errors.email.message);
    if (errors.password) return String(errors.password.message);
    if (errors.confirmPassword) return String(errors.confirmPassword.message);
    return null;
  };  

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        mx: '0',
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        animation: "fadeInUp 0.5s linear"
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Отображение первого сообщения об ошибке */}
        {getFirstErrorMessage() && (
          <Typography color="error" sx={{ fontSize: '0.75rem', mb: 2, textAlign: "center"}}>
            {getFirstErrorMessage()}
          </Typography>
        )}

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          InputProps={{ sx: { fontSize: '0.75rem' } }}
          InputLabelProps={{ sx: { fontSize: '0.75rem' } }}
          {...register("username", { 
            required: "Username is required",
            minLength: { value: 3, message: "Username must be at least 3 characters" },
            maxLength: { value: 20, message: "Username cannot exceed 20 characters" }
          })}
          error={!!errors.username}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          InputProps={{ sx: { fontSize: '0.75rem' } }}
          InputLabelProps={{ sx: { fontSize: '0.75rem' } }}
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Enter a valid email address"
            }
          })}
          error={!!errors.email}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          InputProps={{ sx: { fontSize: '0.75rem' } }}
          InputLabelProps={{ sx: { fontSize: '0.75rem' } }}
          {...register("password", { 
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
            maxLength: { value: 32, message: "Password cannot exceed 32 characters" }
          })}
          error={!!errors.password}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          type="password"
          InputProps={{ sx: { fontSize: '0.75rem' } }}
          InputLabelProps={{ sx: { fontSize: '0.75rem' } }}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: value => value === password || "Passwords do not match"
          })}
          error={!!errors.confirmPassword}
        />
        {error && (
          <Typography color="error" sx={{ fontSize: '0.75rem', mt: 1, textAlign: 'center' }}>
            Registration failed. Please try again.
          </Typography>
        )}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{ mt: 2, fontSize: '0.75rem' }}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Box>
  );
}
