import { modal } from '@pspod/ui-components';
import { InstanceProps } from 'react-modal-promise';

import { CreateAccountForm } from './create-account-form';
import { ICreateAccountForm } from './create-account-form.schema';

export const createAccountModal = ({
  title,
  onSave,
  onCancel,
}: {
  title: string;
  onSave: (data: ICreateAccountForm) => void;
  onCancel?: () => void;
}) =>
  modal({
    title,
    onOk: onSave,
    onCancel: onCancel,
    renderContent: (modalInstance: InstanceProps<ICreateAccountForm, never>) => (
      <CreateAccountForm
        {...modalInstance}
        onSave={modalInstance.onResolve}
        onCancel={modalInstance.onReject}
      />
    ),
  });
