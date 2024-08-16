import { RouteDescription } from '~/routing/routes.types';

export const tablesSubroutes: RouteDescription[] = [
  {
    isIndex: true,
    title: 'NAVIGATION.TABLES',
    lazyElement: () => import('~/pages/tables/content/table.page'),
  },
  {
    path: `:nodeId`,
    title: 'NAVIGATION.TABLES',
    lazyElement: () => import('~/pages/tables/content/node-content.page'),
  },
];
