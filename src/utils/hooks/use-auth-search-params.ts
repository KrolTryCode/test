import { notifyError } from '@pspod/ui-components';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as y from 'yup';

export const useAuthSearchParams = (hasUsername = false) => {
  const { user, code } = useSearch({ strict: false });
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if ((hasUsername && !user) || !code) {
      notifyError(t('ERROR.NOT_AUTHORIZED'));
      void navigate({ to: '/auth/login' });
    }
  }, [code, hasUsername, navigate, t, user]);

  return { username: user, activationCode: code };
};

type AuthSearch = {
  user?: string;
  code: string;
};

const authSearchSchema: y.ObjectSchema<AuthSearch> = y.object().shape({
  user: y.string().optional(),
  code: y.string().required(),
});

export const validateAuthSearch = (search: AuthSearch) => authSearchSchema.validateSync(search);
