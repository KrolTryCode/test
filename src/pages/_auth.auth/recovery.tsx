import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';

import { useCompleteAccountRecoveryMutation } from '~/api/queries/accounts/complete-account-recovery.mutation';
import { ChangePasswordForm } from '~/components/forms/change-password/change-password-form';
import { ChangePasswordForm as ChangePasswordFormSchema } from '~/components/forms/change-password/change-password-form.schema';
import { showErrorMessage } from '~/utils/show-error-message';

import { useAuthSearchParams } from './use-auth-search-params.hook';

export const Route = createFileRoute('/_auth/auth/recovery')({
  component: RecoveryPage,
  staticData: {
    title: 'ACTION.RECOVER',
  },
});

function RecoveryPage() {
  const navigate = useNavigate();
  const { activationCode } = useAuthSearchParams();

  const { mutateAsync: completeRecovery, isPending } = useCompleteAccountRecoveryMutation({
    onSuccess: () => void navigate({ to: '/auth/login' }),
    onError: e => showErrorMessage(e, 'ERROR.NOT_AUTHORIZED'),
  });

  const onSubmit = useCallback(
    async ({ password }: ChangePasswordFormSchema) => {
      await completeRecovery({ activationCode, password });
    },
    [activationCode, completeRecovery],
  );

  return (
    <ChangePasswordForm
      isPending={isPending}
      onSave={onSubmit}
      onReject={() => void navigate({ to: '/auth/login' })}
    />
  );
}
