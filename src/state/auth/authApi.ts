import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ExportUserFromClient } from '../../interfaces/auth';
import { LoginPayload } from '../../interfaces/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://89.111.170.87:8085',
  }),
  endpoints: (builder) => ({
    register: builder.mutation<LoginPayload, ExportUserFromClient>({
      query: (data) => ({
        url: '/auth/reg',
        method: 'POST',
        body: data,
      }),
    }),
    
    login: builder.mutation<LoginPayload, ExportUserFromClient>({
      query: ({ username, email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { username, email, password },
      }),
    }),

    refreshToken: builder.mutation<LoginPayload, { refreshToken: string }>({
      query: ( refreshToken) => ({
        url: '/auth/token',
        method: 'POST',
        body: refreshToken,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshTokenMutation } = authApi;
