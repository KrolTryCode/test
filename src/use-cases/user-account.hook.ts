import { notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useChangePasswordAdminMutation } from '~/api/queries/accounts/change-password-admin.mutation';
import { useUpdateUserMutation } from '~/api/queries/users/update-user.mutation';
import { UpdateUserRequest } from '~/api/utils/api-requests';
import { changePasswordModal } from '~/components/forms/change-password/change-password-form.modal';
import { UpdateUserRequestNullable } from '~/components/forms/profile/profile-form.schema';
import { showErrorMessage } from '~/utils/show-error-message';

export const useUserAccount = (userId: string, email?: string) => {
  const { t } = useTranslation();

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
        user: email ?? '',
        onSave: changePasswordByAdmin,
      }),
    [changePasswordByAdmin, t, email],
  );

  return {
    handleChangePassword,
    handleUpdateUser,
  };
};
