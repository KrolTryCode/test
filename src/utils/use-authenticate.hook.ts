import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetCurrentUserQuery } from '~/api/queries/users/get-current-user.query';
import { UserWithPermissions } from '~/api/utils/api-requests';
import { useAppDispatch } from '~/app/store.hooks';
import { setUser } from '~/app/user/user.store';
import { notifyPasswordExpired } from '~/components/password-expired/password-expired.component';

export const useAuthenticate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { refetch: getCurrentUser, isFetched: isUserFetched } = useGetCurrentUserQuery({
    enabled: false,
  });

  const saveAndNotify = useCallback(
    (user: UserWithPermissions) => {
      dispatch(setUser(user));
      if (user.passwordExpiresSoon) {
        notifyPasswordExpired(navigate);
      }
    },
    [dispatch, navigate],
  );

  const getUser = useCallback(async () => {
    const { data: userWithPermissions } = await getCurrentUser();
    if (!userWithPermissions || !Object.keys(userWithPermissions).length) {
      return;
    }

    saveAndNotify(userWithPermissions);
    return userWithPermissions.user;
  }, [getCurrentUser, saveAndNotify]);

  return { getUser, isUserFetched };
};
