import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCompleteAccountRecoveryMutation } from '~/api/queries/accounts/complete-account-recovery.mutation';
import { ChangePasswordForm } from '~/components/change-password-form/change-password-form.component';
import { ChangePasswordForm as ChangePasswordFormSchema } from '~/components/change-password-form/change-password-form.schema';
import { authPath, loginPath } from '~/utils/configuration/routes-paths';
import { showErrorMessage } from '~/utils/show-error-message';

import { useAuthSearchParams } from './use-auth-search-params.hook';

const AccountRecoveryPage: FC = () => {
  const navigate = useNavigate();
  const { activationCode } = useAuthSearchParams();

  const { mutateAsync: completeRecovery, isPending } = useCompleteAccountRecoveryMutation({
    onSuccess: () => navigate(`/${authPath}/${loginPath}`),
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
      onReject={() => navigate(`/${authPath}/${loginPath}`)}
    />
  );
};

export default AccountRecoveryPage;
