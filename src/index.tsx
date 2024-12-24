import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppWithProviders } from '~/app-providers';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
);
