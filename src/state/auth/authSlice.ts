import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginPayload } from '../../interfaces/auth';
import { safeLocalStorage } from '@/helpers/safeLocalStorage';

interface AuthState {
    token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<LoginPayload>) => {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      safeLocalStorage.setItem('accessToken', action.payload.accessToken);
      safeLocalStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      safeLocalStorage.removeItem('accessToken');
      safeLocalStorage.removeItem('refreshToken');
    },
  },
});


export const { setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
