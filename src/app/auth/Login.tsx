import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { useLoginMutation } from '@/state/auth/authApi';
import { useDispatch } from 'react-redux';
import { setTokens } from '@/state/auth/authSlice';

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
          helperText={errors.email ? String(errors.email.message) : ''}
          FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
          color='secondary'
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          InputProps={{ sx: { fontSize: '0.75rem' } }}
          InputLabelProps={{ sx: { fontSize: '0.75rem' } }}
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password ? String(errors.password.message) : ''}
          FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
        />
        {error && (
          <Box color="error.main" sx={{ fontSize: '0.75rem', mt: 1, textAlign: 'center' }}>
            Login failed. Please check your credentials.
          </Box>
        )}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{ mt: 2, fontSize: '0.75rem' }}
        >
          {isLoading ? 'Logging in...' : 'Continue'}
        </Button>
      </form>
    </Box>
  );
}

