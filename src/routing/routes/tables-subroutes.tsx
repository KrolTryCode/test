import { RouteDescription } from '~/routing/routes.types';
import { editPath, structurePath } from '~/utils/configuration/routes-paths';

export const tablesSubroutes: RouteDescription[] = [
  {
    lazyElement: () => import('~/pages/tables/tables.page'),
    children: [
      {
        isIndex: true,
        title: 'NAVIGATION.TABLES',
        lazyElement: () => import('~/pages/tables/content/table.page'),
      },
      {
        path: `:nodeId`,
        title: 'TREE.NODE',
        lazyElement: () => import('~/pages/tables/content/node-content.page'),
      },
    ],
  },
  {
    path: `${editPath}/:nodeId/${structurePath}`,
    title: 'STRUCTURE.EDIT',
    lazyElement: () => import('~/pages/tables/table-structure/table-structure.page'),
  },
];
