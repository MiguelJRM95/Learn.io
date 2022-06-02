import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileData } from '../../../hooks/database/users';

export interface ProfileState {
  profile: ProfileData | null;
}

const initialState: ProfileState = {
  profile: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
      return state;
    },
  },
});

export const { addProfile } = profileSlice.actions;

export const reducer = profileSlice.reducer;

export const selectProfile = (state: ProfileState) => state.profile;
