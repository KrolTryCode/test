import { Preloader } from '@pspod/ui-components';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { AccessChecker } from '~/routing/access-checker/access-checker.component';
import { useDownloadTranslations } from '~/utils/configuration/translations/use-init-i18n.hook';

import './themes/generated/theme.base.css';
import './global-styles.scss';
import { useAuthenticate } from './utils/hooks/use-authenticate';

export const App: FC = () => {
  useDownloadTranslations();
  const { getUser, isUserFetched } = useAuthenticate();

  useEffect(() => {
    void getUser();
  }, [getUser]);

  if (!isUserFetched) {
    return <Preloader />;
  }

  return (
    <AccessChecker>
      <Outlet />
    </AccessChecker>
  );
};
