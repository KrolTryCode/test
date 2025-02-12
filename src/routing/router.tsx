import { createRouter } from '@tanstack/react-router';

import { RouteErrorBoundary } from '~/routing/_fallbacks/errors/error-boundary.component';
import { NotFoundPage } from '~/routing/_fallbacks/errors/not-found.component';

import { routeTree } from './routeTree.gen';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    title?: string;
    order?: number;
    accessBy?: string[];
  }
}

// Set up a Router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent({ error }) {
    return <RouteErrorBoundary error={error} />;
  },
});
