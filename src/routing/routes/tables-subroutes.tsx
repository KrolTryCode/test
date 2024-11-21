import { RouteDescription } from '~/routing/routes.types';
import { structurePath } from '~/utils/configuration/routes-paths';

export const tablesSubroutes: RouteDescription[] = [
  {
    lazyElement: () => import('~/pages/tables/tables.page'),
    children: [
      {
        isIndex: true,
        path: `:nodeId?`,
        title: 'NAVIGATION.TABLES',
        lazyElement: () => import('~/pages/tables/content/node-content.page'),
      },
      {
        path: `:nodeId/${structurePath}`,
        title: 'STRUCTURE.EDIT',
        lazyElement: () => import('~/pages/tables/table-structure/table-structure.page'),
      },
    ],
  },
];
