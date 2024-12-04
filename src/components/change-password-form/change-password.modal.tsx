import { modal } from '@pspod/ui-components';
import { InstanceProps } from 'react-modal-promise';

import { UpdatePasswordRequest } from '~/api/utils/api-requests';

import { ChangePasswordForm } from './change-password-form.component';

export const changePasswordModal = ({
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
