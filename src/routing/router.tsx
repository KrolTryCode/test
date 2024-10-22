import { Preloader } from '@pspod/ui-components';
import { lazy, Suspense } from 'react';
import { RouteObject, createBrowserRouter } from 'react-router-dom';

import { App } from '~/app';
import { RouteErrorBoundary } from '~/pages/_fallbacks/errors/error-boundary/error-boundary.component';
import { TitleProvider } from '~/routing/page-title.context';
import { routes } from '~/routing/routes/routes';
import { RouteDescription, RouteTitleMeta } from '~/routing/routes.types';

export const router = createBrowserRouter([
  {
    element: (
      <TitleProvider>
        <App />
      </TitleProvider>
    ),
    children: mapRouteDescriptionToReactRoutes(routes),
    errorElement: <RouteErrorBoundary />,
  },
]);

function mapRouteDescriptionToReactRoutes(descriptions: RouteDescription[]): RouteObject[] {
  return descriptions.map(description => {
    const route: RouteObject = {
      index: description.isIndex,
      path: description.path,
      loader: (): RouteTitleMeta => ({
        accessBy: description.accessBy,
        menuDisplay: description.menuDisplay,
        title: description.title,
      }),
    };

    if (description.element) {
      route.element = description.element;
    } else if (description.lazyElement) {
      const Component = lazy(description.lazyElement);
      route.element = (
        <Suspense fallback={<Preloader />}>
          <Component />
        </Suspense>
      );
    }

    if (description.children) {
      route.children = mapRouteDescriptionToReactRoutes(description.children);
    }

    return route;
  });
}
