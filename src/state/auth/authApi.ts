import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ExportUserFromClient, KeycloakAuthResponse } from '../../interfaces/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://89.111.170.87:8085',
  }),
  endpoints: (builder) => ({
    register: builder.mutation<KeycloakAuthResponse, ExportUserFromClient>({
      query: (data) => ({
        url: '/auth/reg',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<KeycloakAuthResponse, { username: string; password: string }>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.mutation<KeycloakAuthResponse, { refreshToken: string }>({
      query: (data) => ({
        url: '/refresh-token',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshTokenMutation } = authApi;
