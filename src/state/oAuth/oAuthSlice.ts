// store/slices/oAuthSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { KeycloakAuthResponse, OAuthState } from '../../interfaces/auth';

export const initiateOAuth = createAsyncThunk(
    'oAuth/initiateOAuth',
    async (platform: 'vk' | 'yandex' | 'gosuslugi' | 'telegram') => {
        return platform;
    }
);

export const handleOAuthResponse = createAsyncThunk(
    'oAuth/handleOAuthResponse',
    async (authResponse: KeycloakAuthResponse) => {
        return authResponse;
    }
);

const initialState: OAuthState = {
    platform: null,
    authTokens: null,
    isLoading: false,
    isAuthenticated: false,
};

const oAuthSlice = createSlice({
    name: 'oAuth',
    initialState,
    reducers: {
        resetOAuthState: (state) => {
            state.platform = null;
            state.authTokens = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initiateOAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(initiateOAuth.fulfilled, (state, action: PayloadAction<'vk' | 'yandex' | 'gosuslugi' | 'telegram'>) => {
                state.platform = action.payload;
                state.isLoading = false;
            })
            .addCase(handleOAuthResponse.fulfilled, (state, action: PayloadAction<KeycloakAuthResponse>) => {
                state.authTokens = action.payload;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(handleOAuthResponse.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            });
    },
});

export const { resetOAuthState } = oAuthSlice.actions;
export const selectOAuthState = (state: RootState) => state.oAuth;
export default oAuthSlice.reducer;
