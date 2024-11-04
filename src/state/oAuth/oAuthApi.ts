// store/slices/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { KeycloakAuthResponse, KeycloakLoginPayload } from '../../interfaces/auth';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://your-keycloak-server.com/auth/realms/your-realm/protocol/openid-connect',
    }),
    endpoints: (builder) => ({
        initiateOAuth: builder.mutation<KeycloakAuthResponse, { provider: string }>({
            query: ({ provider }) => ({
                url: `/oauth2/${provider}`, // или другой эндпоинт
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        loginWithOAuth: builder.mutation<KeycloakAuthResponse, KeycloakLoginPayload>({
            query: (credentials) => ({
                url: '/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'password',
                    client_id: credentials.clientId,
                    username: credentials.username,
                    password: credentials.password,
                }).toString(),
            }),
        }),
        refreshAccessToken: builder.mutation<KeycloakAuthResponse, { refreshToken: string }>({
            query: ({ refreshToken }) => ({
                url: '/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    client_id: 'your-client-id',
                    refresh_token: refreshToken,
                }).toString(),
            }),
        }),
        logout: builder.mutation<void, { refreshToken: string }>({
            query: ({ refreshToken }) => ({
                url: '/logout',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: 'your-client-id', 
                    refresh_token: refreshToken,
                }).toString(),
            }),
        }),
    }),
});

export const { useInitiateOAuthMutation, useLoginWithOAuthMutation, useRefreshAccessTokenMutation, useLogoutMutation } = apiSlice;
export default apiSlice.reducer;
