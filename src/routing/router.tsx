import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import { RouteErrorBoundary } from '~/routing/_fallbacks/cases/error-boundary.component';
import { NotFoundEntity, NotFoundPage } from '~/routing/_fallbacks/cases/not-found.component';

import { PageLoading } from './_fallbacks/cases/pending.component';
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

const queryClient = new QueryClient();

// Set up a Router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent({ error }) {
    if (error instanceof AxiosError && error.status === 400 && !!error.response?.data.message) {
      return <NotFoundEntity message={String(error.response?.data.message)} />;
    }

    return <RouteErrorBoundary error={error} />;
  },
  defaultPendingComponent: PageLoading,
  context: {
    queryClient,
  },
});
