import { notifySuccess } from '@pspod/ui-components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useChangePasswordMutation } from '~/api/queries/users/change-password.mutation';
import { useUpdateUserMutation } from '~/api/queries/users/update-user.mutation';
import { UpdateUserRequest, User } from '~/api/utils/api-requests';
import { setUserInfo } from '~/app/user/user.store';
import { changePasswordModal } from '~/components/forms/change-password/change-password-form.modal';
import { UpdateUserRequestNullable } from '~/components/forms/profile/profile-form.schema';
import { showErrorMessage } from '~/utils/show-error-message';

export const useProfile = (user: User) => {
  const { t } = useTranslation();

  const { mutate: changePassword } = useChangePasswordMutation({
    onSuccess: () => notifySuccess(t('AUTH.PASSWORD.SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutateAsync: updateUser } = useUpdateUserMutation(user?.id ?? '', true, {
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
        user: user?.email ?? '',
        onSave: changePassword,
      }),
    [changePassword, user?.email, t],
  );

  return {
    handleChangePassword,
    handleUpdateUser,
  };
};
