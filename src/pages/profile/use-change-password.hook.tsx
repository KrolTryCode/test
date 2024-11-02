import { notifySuccess, modal } from '@pspod/ui-components';
import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useChangePasswordAdminMutation } from '~/api/queries/accounts/change-password-admin.mutation';
import { useChangePasswordMutation } from '~/api/queries/users/change-password.mutation';
import { UpdatePasswordRequest } from '~/api/utils/api-requests';
import { ChangePasswordForm } from '~/components/change-password-form/change-password-form.component';
import { showErrorMessage } from '~/utils/show-error-message';

export const useChangePassword = (user: string, userId: string) => {
  const { t } = useTranslation();

  const { mutate: changePassword } = useChangePasswordMutation({
    onSuccess: () => notifySuccess(t('AUTH.PASSWORD.SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const { mutate: changePasswordByAdmin } = useChangePasswordAdminMutation(userId, {
    onSuccess: () => notifySuccess(t('AUTH.PASSWORD.SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const handleChangePassword = () =>
    changePasswordModal({
      title: t('ACTION.CHANGE', { type: t('AUTH.PASSWORD.NAME').toLowerCase() }),
      user,
      onSave: changePassword,
    });

  const handleChangePasswordByAdmin = () =>
    changePasswordModal({
      title: t('ACTION.CHANGE', { type: t('AUTH.PASSWORD.NAME').toLowerCase() }),
      user,
      onSave: changePasswordByAdmin,
    });

  return {
    onChangePassword: handleChangePassword,
    onChangePasswordByAdmin: handleChangePasswordByAdmin,
  };
};

const changePasswordModal = ({
  title,
  user,
  onSave,
}: {
  title: string;
  user: string;
  onSave: (data: UpdatePasswordRequest) => void;
}) =>
  modal<UpdatePasswordRequest>({
    title,
    onOk: onSave,
    renderContent: (modalInstance: InstanceProps<UpdatePasswordRequest, never>) => (
      <ChangePasswordForm
        {...modalInstance}
        isSettingNew
        username={user}
        onSave={modalInstance.onResolve}
      />
    ),
  });
