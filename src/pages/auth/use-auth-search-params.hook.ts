import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { notifyError } from '~/ui-components/notifications/notifications';
import { authPath, loginPath } from '~/utils/configuration/routes-paths';

export const useAuthSearchParams = (hasUsername = false) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const username = searchParams.get('user') ?? '';
  const activationCode = searchParams.get('code') ?? '';

  useEffect(() => {
    if ((hasUsername && !username) || !activationCode) {
      notifyError(t('ERROR.NOT_AUTHORIZED'));
      navigate(`/${authPath}/${loginPath}`);
    }
  }, [activationCode, hasUsername, navigate, t, username]);

  return { username, activationCode };
};
