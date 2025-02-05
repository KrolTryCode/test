import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';

import { useRegisterAccountMutation } from '~/api/queries/accounts/register-account.mutation';
import { ChangePasswordForm } from '~/components/forms/change-password/change-password-form';
import { ChangePasswordForm as ChangePasswordFormSchema } from '~/components/forms/change-password/change-password-form.schema';
import { showErrorMessage } from '~/utils/show-error-message';

import { useAuthSearchParams } from './use-auth-search-params.hook';

export const Route = createFileRoute('/_auth/auth/registration')({
  component: RegistrationPage,
  staticData: {
    title: 'ACTION.REGISTER',
  },
});

function RegistrationPage() {
  const navigate = useNavigate();
  const { username, activationCode } = useAuthSearchParams(true);

  const { mutateAsync: registerAccount, isPending } = useRegisterAccountMutation({
    onSuccess: () => void navigate({ to: `/auth/login` }),
    onError: e => showErrorMessage(e, 'ERROR.NOT_AUTHORIZED'),
  });

  const onSubmit = useCallback(
    async ({ password }: ChangePasswordFormSchema) => {
      await registerAccount({ username, activationCode, password });
    },
    [activationCode, registerAccount, username],
  );

  return (
    <ChangePasswordForm
      isPending={isPending}
      onSave={onSubmit}
      username={username}
      onReject={() => void navigate({ to: `/auth/login` })}
    />
  );
}
