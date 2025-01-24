import '@testing-library/jest-dom';

import {
  mockedLocation,
  mockedMatches,
  mockedNavigate,
  mockedParams,
} from 'tests/__mocks__/@tanstack/react-router.mock';
import { setupTestLocalization } from 'tests/setup/setup-test-localization';

import { setupTestApi } from './setup-test-api';

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router');

  return {
    ...actual,
    useLocation: mockedLocation,
    useParams: mockedParams,
    useMatches: mockedMatches,
    useNavigate: () => mockedNavigate,

    // при таком сценарии не видит настоящего дерева, чтобы построить меню
    // useRouter: () =>
    //   actual.createRouter({
    //     routeTree: actual.createRootRoute(),
    //   }),

    // при таком сценарии ощущение, что пытается запустить все приложение (падает на project-node-form.schema)
    // useRouter: () => (actual.createRouter as typeof createRouter)({ routeTree }),
  };
});

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
