import { RouteDescription } from '~/routing/routes.types';

export type NavAccordionProps = Pick<RouteDescription, 'path' | 'menuDisplay'> & {
  childrenRoutes: RouteDescription['children'];
  defaultExpanded: boolean;
  onRouteClick: () => void;
};
