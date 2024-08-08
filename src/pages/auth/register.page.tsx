import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRegisterAccountMutation } from '~/api/queries/accounts/register-account.mutation';
import { ChangePasswordForm } from '~/components/change-password-form/change-password-form.component';
import { ChangePasswordForm as ChangePasswordFormSchema } from '~/components/change-password-form/change-password-form.schema';
import { authPath, loginPath } from '~/utils/configuration/routes-paths';
import { showErrorMessage } from '~/utils/show-error-message';

import { useAuthSearchParams } from './use-auth-search-params.hook';

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const { username, activationCode } = useAuthSearchParams(true);

  const { mutateAsync: registerAccount, isPending } = useRegisterAccountMutation({
    onSuccess: () => navigate(`/${authPath}/${loginPath}`),
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
      onReject={() => navigate(`/${authPath}/${loginPath}`)}
    />
  );
};

export default RegisterPage;
