import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCompleteAccountReactivationMutation } from '~/api/queries/accounts/reactivate-account.mutation';
import { ChangePasswordForm } from '~/components/change-password-form/change-password-form.component';
import { ChangePasswordForm as ChangePasswordFormSchema } from '~/components/change-password-form/change-password-form.schema';
import { authPath, loginPath } from '~/utils/configuration/routes-paths';
import { showErrorMessage } from '~/utils/show-error-message';

import { useAuthSearchParams } from './use-auth-search-params.hook';

const AccountReactivation: FC = () => {
  const navigate = useNavigate();
  const { activationCode } = useAuthSearchParams();

  const { mutateAsync: completeReactivation, isPending } = useCompleteAccountReactivationMutation({
    onSuccess: () => navigate(`/${authPath}/${loginPath}`),
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
      onReject={() => navigate(`/${authPath}/${loginPath}`)}
    />
  );
};

export default AccountReactivation;
