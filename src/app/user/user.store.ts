import { createSlice } from '@reduxjs/toolkit';

import { UserWithPermissions } from '~/api/utils/api-requests';

import { RootState } from '../application.store';

export interface UserState {
  data?: UserWithPermissions;
}

const getStorage = () => {
  const rememberMe = localStorage.getItem('rememberMe') === 'true';
  return rememberMe ? localStorage : sessionStorage;
};

const initialState: UserState = {
  data: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut: state => {
      getStorage().removeItem('accessToken');
      getStorage().removeItem('refreshToken');
      state.data = {};
    },
    setUser: (state, action: { payload: UserWithPermissions }) => {
      state.data = action.payload;
    },
  },
});

export const { signOut, setUser } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data?.user;

export const selectUserLoggedIn = (state: RootState) => !!state.user.data?.user;

export const selectUserAuthorities = (state: RootState) => state.user.data?.permissions ?? [];

export const userReducer = userSlice.reducer;
