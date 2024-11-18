import { create } from 'zustand';

import { UserWithPermissions, User } from '~/api/utils/api-requests';

interface UserState {
  data: UserWithPermissions | null;
  isLoggedIn: boolean;
}

export const useUserStore = create<UserState>()(() => ({
  data: null,
  isLoggedIn: false,
}));

export const getCurrentUserTimezone = () =>
  useUserStore.getState().data?.user?.userTimeZone?.systemTitle ?? 'Z';

export const setUserData = (data: UserWithPermissions) =>
  useUserStore.setState({ data, isLoggedIn: !!data });

export const setUserInfo = (user: User) =>
  useUserStore.setState(state =>
    state.data && state.isLoggedIn ? { data: { ...state.data, user } } : state,
  );

export const clearUserData = () => useUserStore.setState({ data: null, isLoggedIn: false });
