import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';

import { useCompleteAccountReactivationMutation } from '~/api/queries/accounts/reactivate-account.mutation';
import { ChangePasswordForm } from '~/components/forms/change-password/change-password-form';
import { ChangePasswordForm as ChangePasswordFormSchema } from '~/components/forms/change-password/change-password-form.schema';
import { showErrorMessage } from '~/utils/show-error-message';

import { useAuthSearchParams } from './use-auth-search-params.hook';

export const Route = createFileRoute('/_auth/auth/reactivation')({
  component: ReactivationPage,
  staticData: {
    title: 'ACTION.REACTIVATE',
  },
});

function ReactivationPage() {
  const navigate = useNavigate();
  const { activationCode } = useAuthSearchParams();

  const { mutateAsync: completeReactivation, isPending } = useCompleteAccountReactivationMutation({
    onSuccess: () => void navigate({ to: '/auth/login' }),
    onError: e => showErrorMessage(e, 'ERROR.NOT_AUTHORIZED'),
  });

  const onSubmit = useCallback(
    async ({ password }: ChangePasswordFormSchema) => {
      await completeReactivation({ activationCode, password });
    },
    [activationCode, completeReactivation],
  );

  return (
    <ChangePasswordForm
      isPending={isPending}
      onSave={onSubmit}
      onReject={() => void navigate({ to: '/auth/login' })}
    />
  );
}
