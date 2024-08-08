import '@testing-library/jest-dom';
import { LicenseInfo } from '@mui/x-data-grid-premium';

import 'jest-styled-components';
import { mockedMatches, mockedNavigate, mockedParams } from 'tests/__mocks__/react-router-dom.mock';
import { setupTestLocalization } from 'tests/setup/setup-test-localization';

import { setupTestApi } from './setup-test-api';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockedNavigate,
  useParams: mockedParams,
  useMatches: mockedMatches,
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
vi.mock('@mui/material', async () => ({
  ...(await vi.importActual('@mui/material')),
  useMediaQuery: () => true,
}));

// for jsPDF
HTMLCanvasElement.prototype.getContext = () => {
  return null;
};

Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn(),
    href: 'http://localhost:9000/',
    origin: 'http://localhost:9000',
    protocol: 'http:',
    host: 'localhost:9000',
    hostname: 'localhost',
    port: '9000',
    pathname: '/',
    search: '',
    hash: '',
  },
  writable: true,
});

setupTestLocalization();
setupTestApi();
LicenseInfo.setLicenseKey(
  '0bf1739d4674427cc4a3ff58a49957a8Tz1NVUktOTk5LEU9MTkyNDEwODQ1NzkwNCxTPXByZW1pdW0sTE09cGVycGV0dWFsLEtWPTI=',
);

afterEach(() => {
  vi.restoreAllMocks();
});

afterAll(() => {
  vi.clearAllMocks();
  vi.clearAllTimers();
});
