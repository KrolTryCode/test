import { useLocation, useRouter, Route } from '@tanstack/react-router';

import { FileRoutesById } from '~/routing/routeTree.gen';

type MainRouteChildren = Required<FileRoutesById['/_main']>['children'];
type MainRouteChild = MainRouteChildren[keyof MainRouteChildren];

export function useSubMenu() {
  const { pathname } = useLocation();
  const router = useRouter();

  const secondLevelRoutes = (
    router.routesById['/_main'].children as unknown as MainRouteChild[]
  ).find(r => r.id.includes(pathname.split('/')[1]))?.children as Route[];

  if (!secondLevelRoutes?.length) {
    return [];
  }

  //TODO: filter by RBAC
  return secondLevelRoutes
    .filter(r => {
      //TODO: актуальная проверка?
      const isNotIdPath = true; //!r.path?.includes('$');
      const hasTitle = !!r.options.staticData?.title;

      return isNotIdPath && hasTitle;
    })
    .toSorted(
      (a, b) => Number(a.options?.staticData?.order) - Number(b.options?.staticData?.order),
    );
}
