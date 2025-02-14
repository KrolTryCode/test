import { notifySuccess } from '@pspod/ui-components';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useChangePasswordAdminMutation } from '~/api/queries/accounts/change-password-admin.mutation';
import { getUserQueryOptions } from '~/api/queries/users/get-user.query';
import { useUpdateUserMutation } from '~/api/queries/users/update-user.mutation';
import { UpdateUserRequest } from '~/api/utils/api-requests';
import { changePasswordModal } from '~/components/forms/change-password/change-password-form.modal';
import { UpdateUserRequestNullable } from '~/components/forms/profile/profile-form.schema';
import { getFullName } from '~/components/user-profile/user-profile.utils';
import { showErrorMessage } from '~/utils/show-error-message';

export const useUserAccount = (userId: string) => {
  const { t } = useTranslation();
  const { data: user, isLoading: isUserLoading } = useQuery(getUserQueryOptions(userId));

  const { mutate: changePasswordByAdmin } = useChangePasswordAdminMutation(userId, {
    onSuccess: () => notifySuccess(t('AUTH.PASSWORD.SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutateAsync: updateUser } = useUpdateUserMutation(userId, false, {
    onSuccess: () => notifySuccess(t('MESSAGE.UPDATE_SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.UPDATE_FAILED'),
  });

  const handleUpdateUser = useCallback(
    async (values: UpdateUserRequestNullable) => {
      await updateUser(values as UpdateUserRequest);
    },
    [updateUser],
  );

  const handleChangePassword = useCallback(
    () =>
      changePasswordModal({
        title: t('ACTION.CHANGE', { type: t('AUTH.PASSWORD.NAME').toLowerCase() }),
        user: user?.email ?? '',
        onSave: changePasswordByAdmin,
      }),
    [changePasswordByAdmin, t, user?.email],
  );

  const fullName = getFullName(user?.firstName, user?.lastName, user?.surName);

  return {
    user: { ...user, fullName },
    isUserLoading,
    handleChangePassword,
    handleUpdateUser,
  };
};
