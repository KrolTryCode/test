import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import i18n from 'i18next';
import { FC } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Container as ModalContainer } from 'react-modal-promise';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from '~/routing/router';
import { MuiThemeProvider } from '~/themes/mui-theme-provider';
import { NotificationsProvider } from '~/ui-components/notifications/provider.component';
import { useI18nInit } from '~/utils/configuration/use-init-i18n.hook';

import { store } from './app/application.store';
import PasswordExpiredContent from './components/password-expired/password-expired.component';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 min
    },
  },
});

export const AppWithProviders: FC = () => {
  useI18nInit();

  return (
    <ReduxProvider store={store}>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition={'top-left'} />
          <MuiThemeProvider>
            <NotificationsProvider CustomComponents={{ passwordExpired: PasswordExpiredContent }} />
            <RouterProvider router={router} />
            <ModalContainer />
          </MuiThemeProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </ReduxProvider>
  );
};
