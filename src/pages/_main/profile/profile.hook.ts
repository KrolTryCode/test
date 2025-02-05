import { notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useChangePasswordMutation } from '~/api/queries/users/change-password.mutation';
import { useGetCurrentUserQuery } from '~/api/queries/users/get-current-user.query';
import { useUpdateUserMutation } from '~/api/queries/users/update-user.mutation';
import { UpdateUserRequest } from '~/api/utils/api-requests';
import { setUserInfo } from '~/app/user/user.store';
import { changePasswordModal } from '~/components/forms/change-password/change-password-form.modal';
import { UpdateUserRequestNullable } from '~/components/forms/profile/profile-form.schema';
import { getFullName } from '~/components/user-profile/user-profile.utils';
import { showErrorMessage } from '~/utils/show-error-message';

export const useProfile = () => {
  const { t } = useTranslation();

  const { data: currentUser, isLoading: isUserLoading } = useGetCurrentUserQuery();

  const { mutate: changePassword } = useChangePasswordMutation({
    onSuccess: () => notifySuccess(t('AUTH.PASSWORD.SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutateAsync: updateUser } = useUpdateUserMutation(currentUser.user?.id ?? '', true, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const handleUpdateUser = useCallback(
    async (values: UpdateUserRequestNullable) => {
      const user = await updateUser(values as UpdateUserRequest);

      if (user) {
        setUserInfo(user);
      }
    },
    [updateUser],
  );

  const handleChangePassword = useCallback(
    () =>
      changePasswordModal({
        title: t('ACTION.CHANGE', { type: t('AUTH.PASSWORD.NAME').toLowerCase() }),
        user: currentUser?.user?.email ?? '',
        onSave: changePassword,
      }),
    [changePassword, currentUser?.user?.email, t],
  );

  const fullName = getFullName(
    currentUser?.user?.firstName,
    currentUser?.user?.lastName,
    currentUser?.user?.surName,
  );

  return {
    user: { ...currentUser?.user, fullName },
    isUserLoading,
    handleChangePassword,
    handleUpdateUser,
  };
};
