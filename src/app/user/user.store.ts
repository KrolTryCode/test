import { create } from 'zustand';

import { UserWithPermissions, User } from '~/api/utils/api-requests';
import { getTz } from '~/utils/date/apply-tz-offset';

interface UserState {
  data: UserWithPermissions | null;
  isLoggedIn: boolean;
}

export const useUserStore = create<UserState>()(() => ({
  data: null,
  isLoggedIn: false,
}));

export const getCurrentUserTimezone = () =>
  getTz(useUserStore.getState().data?.user?.userTimeZone?.title);

export const setUserData = (data: UserWithPermissions) =>
  useUserStore.setState({ data, isLoggedIn: !!data });

export const setUserInfo = (user: User) =>
  useUserStore.setState(state =>
    state.data && state.isLoggedIn ? { data: { ...state.data, user } } : state,
  );

export const clearUserData = () => useUserStore.setState({ data: null, isLoggedIn: false });

// TODO Temporary
export const DEFAULT_PROJECT_ID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
