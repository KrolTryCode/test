import { createFileRoute } from '@tanstack/react-router';

import { useLoginMutation } from '~/api/queries/accounts/login.mutation';
import { LoginForm } from '~/components/forms/login/login-form';
import { ILoginForm } from '~/components/forms/login/login-form.schema';
import { useAuthenticate } from '~/use-cases/authenticate.hook';
import { showErrorMessage } from '~/utils/show-error-message';

export const Route = createFileRoute('/_auth/auth/login')({
  component: LoginPage,
  staticData: {
    title: 'USER.LOGIN',
  },
});

function LoginPage() {
  const { onLogin } = useAuthenticate();
  const { mutateAsync: login, isPending } = useLoginMutation({
    onError: e => showErrorMessage(e, 'ERROR.NOT_AUTHORIZED'),
  });

  const onSave = async (formData: ILoginForm) => {
    const data = await login(formData);
    await onLogin(data, formData.rememberMe);
  };

  return <LoginForm onSave={onSave} isPending={isPending} />;
}
