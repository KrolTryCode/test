import { Preloader, NotificationsProvider } from '@pspod/ui-components';
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { TFunction } from 'i18next';
import { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container as ModalContainer } from 'react-modal-promise';

import PasswordExpiredContent from '~/components/password-expired/password-expired.component';
import { AccessChecker } from '~/routing/access-checker/access-checker.component';
import { TitleProvider } from '~/routing/page-title.context';
import { useDownloadTranslations } from '~/utils/configuration/translations/use-init-i18n.hook';

import '../themes/generated/theme.base.css';
import '../global-styles.scss';
import { useAuthenticate } from '../utils/hooks/use-authenticate';

import { RouteErrorBoundary } from './_fallbacks/errors/error-boundary/error-boundary.component';
import { NotFoundPage } from './_fallbacks/errors/not-found/not-found.component';

export const Route = createRootRoute({
  component: App,
  staticData: { title: 'PROJECT_NAME' },

  notFoundComponent: NotFoundPage,
  errorComponent({ error }) {
    return <RouteErrorBoundary error={error} />;
  },
});

function App() {
  useDownloadTranslations();
  const { t } = useTranslation();

  const { getUser, isUserFetched } = useAuthenticate();

  useEffect(() => {
    void getUser();
  }, [getUser]);

  // https://tanstack.com/router/v1/docs/framework/react/guide/router-context#processing-accumulated-route-context
  const matches = useRouterState({ select: s => s.matches });

  useLayoutEffect(() => {
    if (isUserFetched && matches.length) {
      const titles = [...new Set(matches.map(route => route.staticData.title ?? ''))].toReversed();
      document.title = getTitle(titles, t);
    }
  }, [matches, isUserFetched, t]);

  if (!isUserFetched) {
    return <Preloader />;
  }

  return (
    <AccessChecker>
      <NotificationsProvider CustomComponents={{ passwordExpired: PasswordExpiredContent }} />
      <TitleProvider>
        <Outlet />
      </TitleProvider>
      <ModalContainer />
    </AccessChecker>
  );
}

function getTitle(titles: string[], t: TFunction) {
  let toTitle = t(titles[0]);

  titles.slice(1).forEach(word => {
    if (word) {
      toTitle += ` - ${t(word)}`;
    }
  });

  return toTitle;
}
