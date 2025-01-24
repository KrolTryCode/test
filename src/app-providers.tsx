import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import i18n from 'i18next';
import { FC } from 'react';
import { I18nextProvider } from 'react-i18next';

import { MuiThemeProvider } from '~/themes/mui-theme-provider';
import { DeclinatedTranslationsProvider } from '~/utils/configuration/translations/declinated-translations-provider';
import { useI18nInit } from '~/utils/configuration/translations/use-init-i18n.hook';

import { router } from './routing/tanstack-router';

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
    <I18nextProvider i18n={i18n}>
      <DeclinatedTranslationsProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition={'bottom-right'} />
          <TanStackRouterDevtools initialIsOpen={false} router={router} position={'bottom-right'} />
          <MuiThemeProvider>
            <RouterProvider router={router} />
          </MuiThemeProvider>
        </QueryClientProvider>
      </DeclinatedTranslationsProvider>
    </I18nextProvider>
  );
};
