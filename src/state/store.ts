import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './auth/authApi';
import { profileApi } from './profile/profileApi';
import userReducer from './auth/authSlice';
import profileReducer from './profile/profileSlice';  

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    [profileApi.reducerPath]: profileApi.reducer, // Профильный API
    [authApi.reducerPath]: authApi.reducer, // Аутентификационный API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware) // Миддлвар для authApi
      .concat(profileApi.middleware), // Миддлвар для profileApi
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
