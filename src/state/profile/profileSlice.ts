import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImportUserFromServer } from '@/interfaces/auth';
import { profileApi } from './profileApi';
import { ProfileState } from '@/interfaces/profile';


const initialState: ProfileState = {
  user: null,
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
    setProfile: (state, action: PayloadAction<ImportUserFromServer>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(profileApi.endpoints.getUserProfile.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(profileApi.endpoints.getUserProfile.matchFulfilled, (state, action: PayloadAction<ImportUserFromServer>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addMatcher(profileApi.endpoints.getUserProfile.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch user profile';
      });
  },
});

export const { resetProfile, setProfile } = profileSlice.actions;
export default profileSlice.reducer;
