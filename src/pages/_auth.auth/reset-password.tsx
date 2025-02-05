import { createFileRoute } from '@tanstack/react-router';

import { ResetPasswordForm } from '~/components/forms/reset-password/reset-password-form';

export const Route = createFileRoute('/_auth/auth/reset-password')({
  component: ResetPasswordForm,
  staticData: {
    title: 'AUTH.PASSWORD.FORGOT',
  },
});
