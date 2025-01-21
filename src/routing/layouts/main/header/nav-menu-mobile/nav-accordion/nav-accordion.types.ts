import { RouteDescription } from '~/routing/routes.types';

export interface NavAccordionProps extends Pick<RouteDescription, 'path'> {
  title: string;
  childrenRoutes: Required<RouteDescription>['children'];
  defaultExpanded: boolean;
  onRouteClick: () => void;
}
