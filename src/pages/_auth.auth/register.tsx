import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { CreateAccountForm } from '~/components/create-account/create-account-form.component';

export const Route = createFileRoute('/_auth/auth/register')({
  component: RegisterPage,
  staticData: {
    title: 'ACCOUNT.CREATION_TITLE',
  },
});

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <CreateAccountForm
      selfRegistration
      onReject={() => void navigate({ to: `/auth/login` })}
      onResolve={() => void navigate({ to: `/auth/login` })}
    />
  );
}
