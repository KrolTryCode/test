import { modal } from '@pspod/ui-components';
import { InstanceProps } from 'react-modal-promise';

import { CreateAccountForm, CreateAccountFormModalProps } from './create-account-form';
import { ICreateAccountForm } from './create-account-form.schema';

interface ModalProps extends Omit<CreateAccountFormModalProps, 'onReject' | 'onResolve' | 'type'> {
  title: string;
}

export const createAccountModal = ({ title, ...formProps }: ModalProps) =>
  modal({
    title,
    renderContent: (modalInstance: InstanceProps<ICreateAccountForm, unknown>) => (
      <CreateAccountForm {...modalInstance} type={'modal'} {...formProps} />
    ),
  });
