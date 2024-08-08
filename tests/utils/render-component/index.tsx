import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import ModalContainer from 'react-modal-promise';
import { BrowserRouter } from 'react-router-dom';

import { MuiThemeProvider } from '~/themes/mui-theme-provider';

const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
};

interface RenderComponentOptions {
  withModal?: boolean;
  withRouter?: boolean;
  route?: string;
}

const defaultRenderComponentOptions: RenderComponentOptions = {
  withModal: false,
  withRouter: false,
  route: '/',
};

export const renderComponent = (
  component: JSX.Element,
  { withModal, withRouter, route }: RenderComponentOptions = defaultRenderComponentOptions,
) => {
  // https://testing-library.com/docs/example-react-router/#reducing-boilerplate
  if (withRouter) {
    window.history.pushState({}, 'Test page', route);
  }

  const queryClient = new QueryClient(queryClientConfig);

  return render(
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider>
          {component}
          {withModal && <ModalContainer />}
        </MuiThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>,
    {
      wrapper: ({ children }) => (
        <div data-testid={'appContainer'}>
          {withRouter ? <BrowserRouter>{children}</BrowserRouter> : children}
        </div>
      ),
    },
  );
};
