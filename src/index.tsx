import { LicenseInfo } from '@mui/x-license';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppWithProviders } from '~/app-providers';

LicenseInfo.setLicenseKey(
  '0bf1739d4674427cc4a3ff58a49957a8Tz1NVUktOTk5LEU9MTkyNDEwODQ1NzkwNCxTPXByZW1pdW0sTE09cGVycGV0dWFsLEtWPTI=',
);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
);
