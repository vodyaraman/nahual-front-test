import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password');

  const onSubmit = () => {
    console.log();
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
          label="Username"
          InputProps={{ sx: { fontSize: '0.75rem' } }}
          InputLabelProps={{ sx: { fontSize: '0.75rem' } }}
          {...register("username", { 
            required: "Username is required",
            minLength: { value: 3, message: "Username must be at least 3 characters" },
            maxLength: { value: 20, message: "Username cannot exceed 20 characters" }
          })}
          error={!!errors.username}
          helperText={errors.username ? String(errors.username.message) : ''}
          FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
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
          helperText={errors.email ? String(errors.email.message) : ''}
          FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
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
          helperText={errors.password ? String(errors.password.message) : ''}
          FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
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
          helperText={errors.confirmPassword ? String(errors.confirmPassword.message) : ''}
          FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 2, fontSize: '0.75rem' }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
}
