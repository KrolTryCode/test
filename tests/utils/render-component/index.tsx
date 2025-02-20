import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import ModalContainer from 'react-modal-promise';

import { MuiThemeProvider } from '~/themes/mui-theme-provider';
import { DeclinatedTranslationsProvider } from '~/utils/configuration/translations/declinated-translations-provider';

const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
};

interface RenderComponentOptions {
  withModal?: boolean;
  route?: string;
}

const defaultRenderComponentOptions: RenderComponentOptions = {
  withModal: false,
};

export const renderComponent = (
  component: JSX.Element,
  { withModal, route }: RenderComponentOptions = defaultRenderComponentOptions,
) => {
  // https://testing-library.com/docs/example-react-router/#reducing-boilerplate
  if (route) {
    window.history.pushState({}, 'Test page', route);
    window.location.pathname = route;
  }

  const queryClient = new QueryClient(queryClientConfig);

  return render(
    <I18nextProvider i18n={i18n}>
      <DeclinatedTranslationsProvider>
        <QueryClientProvider client={queryClient}>
          <MuiThemeProvider>
            {component}
            {!!withModal && <ModalContainer />}
          </MuiThemeProvider>
        </QueryClientProvider>
      </DeclinatedTranslationsProvider>
    </I18nextProvider>,
    {
      wrapper: ({ children }) => <div data-testid={'appContainer'}>{children}</div>,
    },
  );
};
