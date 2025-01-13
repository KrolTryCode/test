import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { mockServer } from '~/api/mocks/init-mock-servers';
import { AppWithProviders } from '~/app-providers';

void mockServer.start();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
);
