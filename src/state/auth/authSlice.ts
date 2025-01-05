import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { safeLocalStorage } from '@/helpers/safeLocalStorage';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      safeLocalStorage.setItem('accessToken', action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      safeLocalStorage.setItem('refreshToken', action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      safeLocalStorage.removeItem('accessToken');
      safeLocalStorage.removeItem('refreshToken');
    },
  },
});

export const { setAccessToken, setRefreshToken, logout } = authSlice.actions;
export default authSlice.reducer;

