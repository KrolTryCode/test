import { notifyError } from '@pspod/ui-components';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useAuthSearchParams = (hasUsername = false) => {
  // TODO: check
  //@ts-expect-error non-typed search parameters
  const { user, code } = useSearch({
    strict: false,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if ((hasUsername && !user) || !code) {
      notifyError(t('ERROR.NOT_AUTHORIZED'));
      void navigate({ to: '/auth/login' });
    }
  }, [code, hasUsername, navigate, t, user]);

  return { username: user as string, activationCode: code as string };
};
