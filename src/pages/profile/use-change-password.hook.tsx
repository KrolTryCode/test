import { useTranslation } from 'react-i18next';
import { InstanceProps } from 'react-modal-promise';

import { useChangePasswordMutation } from '~/api/queries/users/change-password.mutation';
import { UpdatePasswordRequest } from '~/api/utils/api-requests';
import { ChangePasswordForm } from '~/components/change-password-form/change-password-form.component';
import { modal } from '~/components/modal/modal';
import { notifySuccess } from '~/ui-components/notifications/notifications';
import { showErrorMessage } from '~/utils/show-error-message';

export const useChangePassword = (user: string) => {
  const { t } = useTranslation();

  const { mutate: changePassword } = useChangePasswordMutation({
    onSuccess: () => notifySuccess(t('AUTH.PASSWORD.SUCCESS')),
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  const handleChangePassword = () =>
    changePasswordModal({
      title: t('BUTTON.CHANGE', { type: t('AUTH.PASSWORD.NAME').toLowerCase() }),
      user,
      onSave: changePassword,
    });

  return {
    onChangePassword: handleChangePassword,
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
