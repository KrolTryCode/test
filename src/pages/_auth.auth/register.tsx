import { notifySuccess } from '@pspod/ui-components';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useSelfCreateUserMutation } from '~/api/queries/users/create-user.mutation';
import { CreateAccountForm } from '~/components/forms/create-account/create-account-form';
import { showErrorMessage } from '~/utils/show-error-message';

export const Route = createFileRoute('/_auth/auth/register')({
  component: RegisterPage,
  staticData: {
    title: 'ACCOUNT.CREATION_TITLE',
  },
});

function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const createUserMutation = useSelfCreateUserMutation({
    onSuccess() {
      void navigate({ to: `/auth/login` });
      notifySuccess(t('MESSAGE.CREATION_SUCCESS'));
    },
    onError: e => showErrorMessage(e, 'ERROR.CREATION_FAILED'),
  });

  return (
    <CreateAccountForm
      onCancel={() => void navigate({ to: `/auth/login` })}
      onSave={createUserMutation.mutate}
      isPending={createUserMutation.isPending}
    />
  );
}
