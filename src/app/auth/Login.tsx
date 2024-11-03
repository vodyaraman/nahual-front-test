import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

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
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password ? String(errors.password.message) : ''}
          FormHelperTextProps={{ sx: { fontSize: '0.75rem' } }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 2, fontSize: '0.75rem' }}
        >
          Continue
        </Button>
      </form>
    </Box>
  );
}
