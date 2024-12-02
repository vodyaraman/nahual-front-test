import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ImportUserFromServer } from '@/interfaces/auth';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://89.111.170.87:8085/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Получение профиля пользователя (GET)
    getUserProfile: builder.query<ImportUserFromServer, void>({
      query: () => 'api/user/',
    }),

    // Удаление пользователя (DELETE)
    deleteUser: builder.mutation<void, void>({
      query: () => ({
        url: 'api/user/delete',
        method: 'DELETE',
      }),
    }),

    // Изменение пароля пользователя (PUT)
    updatePassword: builder.mutation<void, { password: string }>({
      query: ({ password }) => ({
        url: 'api/user/password',
        method: 'PUT',
        body: { password },
      }),
    }),

    // Изменение имени пользователя (PUT)
    updateUsername: builder.mutation<void, { username: string }>({
      query: ({ username }) => ({
        url: 'api/user/username',
        method: 'PUT',
        body: { username },
      }),
    }),

    // Изменение аватара пользователя (PUT)
    updateAvatarUrl: builder.mutation<void, { avatarUrl: string }>({
      query: ({ avatarUrl }) => ({
        url: 'api/user/avatarUrl',
        method: 'PUT',
        body: { avatarUrl },
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useDeleteUserMutation,
  useUpdatePasswordMutation,
  useUpdateUsernameMutation,
  useUpdateAvatarUrlMutation,
} = profileApi;
