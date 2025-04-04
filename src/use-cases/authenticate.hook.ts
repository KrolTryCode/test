import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';

import { getCurrentUserQueryOptions } from '~/api/queries/users/get-current-user.query';
import { LoginResponseWithRefreshToken, UserWithPermissions } from '~/api/utils/api-requests';
import { clearUserData, setUserData } from '~/app/user/user.store';
import { notifyPasswordExpired } from '~/components/password-expired/password-expired.component';
import { homePath } from '~/utils/configuration/routes-paths';
import {
  projectLocalStorageService,
  projectSessionStorageService,
} from '~/utils/localstorage/project-storage/project-storage-instance';
import { ProjectStorageKey } from '~/utils/localstorage/project-storage/project-storage.types';

export const useAuthenticate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const locationState = location.state as { from: Location };
  const { refetch: getCurrentUser, isFetched: isUserFetched } = useQuery(
    getCurrentUserQueryOptions({
      enabled: false,
    }),
  );

  const saveAndNotify = useCallback(
    (user: UserWithPermissions) => {
      setUserData(user);
      if (user.passwordExpiresSoon) {
        notifyPasswordExpired(navigate);
      }
    },
    [navigate],
  );

  const getUser = useCallback(async () => {
    const { data: userWithPermissions } = await getCurrentUser();
    if (!userWithPermissions || !Object.keys(userWithPermissions).length) {
      return;
    }

    saveAndNotify(userWithPermissions);
    return userWithPermissions.user;
  }, [getCurrentUser, saveAndNotify]);

  const navigateAfterLogin = useCallback(async () => {
    const user = await getUser();
    if (user?.id) {
      const sameUser = projectLocalStorageService.get(ProjectStorageKey.UserId) === user.id;
      projectLocalStorageService.set(ProjectStorageKey.UserId, user.id);
      const navigateTo = sameUser && locationState?.from ? locationState.from.pathname : homePath;
      await navigate({ to: navigateTo });
    }
  }, [getUser, locationState, navigate]);

  const onLogin = useCallback(
    async (response: LoginResponseWithRefreshToken, rememberMe: boolean) => {
      const storage = getStorage(rememberMe);
      projectLocalStorageService.set(ProjectStorageKey.RememberMe, rememberMe);
      storage.set(ProjectStorageKey.AccessToken, response.accessTokenInfo?.token ?? '');
      storage.set(ProjectStorageKey.RefreshToken, response.refreshTokenInfo?.token ?? '');
      await navigateAfterLogin();
    },
    [navigateAfterLogin],
  );

  const onLogout = useCallback(() => {
    const storage = getStorage();
    projectLocalStorageService.remove(ProjectStorageKey.RememberMe);
    storage.remove(ProjectStorageKey.AccessToken);
    storage.remove(ProjectStorageKey.RefreshToken);
    clearUserData();
    void queryClient.invalidateQueries();
  }, [queryClient]);

  return { getUser, isUserFetched, onLogin, onLogout };
};

function getStorage(rememberMe?: boolean) {
  const remembered = rememberMe ?? !!projectLocalStorageService.get(ProjectStorageKey.RememberMe);
  return remembered ? projectLocalStorageService : projectSessionStorageService;
}
