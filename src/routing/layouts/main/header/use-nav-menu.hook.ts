import { useMemo } from 'react';

import { useUserStore } from '~/app/user/user.store';
import { routes } from '~/routing/routes/routes';
import { RouteDescription } from '~/routing/routes.types';

export const useNavMenu = () => {
  const permissions = useUserStore(store => store.data?.permissions ?? []);

  const topMenuRoutes: RouteDescription[] = useMemo(
    () =>
      routes
        .find(({ key }) => key === 'main')
        ?.children?.filter(
          ({ menuDisplay, accessBy }) =>
            !!menuDisplay && (accessBy ? accessBy.some(role => permissions.includes(role)) : true),
        ) ?? [],
    [permissions],
  );

  return { topMenuRoutes };
};
