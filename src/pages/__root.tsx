import { Preloader, NotificationsProvider } from '@pspod/ui-components';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet, useRouterState } from '@tanstack/react-router';
import { TFunction } from 'i18next';
import { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container as ModalContainer } from 'react-modal-promise';

import PasswordExpiredContent from '~/components/password-expired/password-expired.component';
import { RouteErrorBoundary } from '~/routing/_fallbacks/cases/error-boundary.component';
import { NotFoundPage } from '~/routing/_fallbacks/cases/not-found.component';
import { AccessChecker } from '~/routing/access-checker/access-checker.component';
import { TitleProvider } from '~/routing/page-title.context';
import { useAuthenticate } from '~/use-cases/authenticate.hook';
import { useUpdateBrowserIcon } from '~/utils/configuration/design/use-update-favicon';
import { useDownloadTranslations } from '~/utils/configuration/translations/use-init-i18n.hook';

import '../themes/generated/theme.base.css';
import '../global-styles.scss';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: App,
  staticData: { title: 'PROJECT_NAME' },

  notFoundComponent: NotFoundPage,
  errorComponent({ error }) {
    return <RouteErrorBoundary error={error} />;
  },
});

function App() {
  useDownloadTranslations();
  useUpdateBrowserIcon();
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
