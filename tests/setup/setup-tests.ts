import '@testing-library/jest-dom';

import { mockedMatches, mockedNavigate, mockedParams } from 'tests/__mocks__/react-router-dom.mock';
import { setupTestLocalization } from 'tests/setup/setup-test-localization';

import { setupTestApi } from './setup-test-api';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockedNavigate,
  useParams: mockedParams,
  useMatches: mockedMatches,
}));

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

Object.defineProperty(document, 'fullscreenEnabled', {
  value: false,
});

await setupTestLocalization();
setupTestApi();

afterEach(() => {
  vi.restoreAllMocks();
});

afterAll(() => {
  vi.clearAllMocks();
  vi.clearAllTimers();
});
