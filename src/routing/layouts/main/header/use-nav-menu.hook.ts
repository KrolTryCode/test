import { useMemo } from 'react';

import { useGetExternalLinksQuery } from '~/api/queries/settings/get-external-links.query';
import { useUserStore } from '~/app/user/user.store';
import { routes } from '~/routing/routes/routes';
import { RouteDescription } from '~/routing/routes.types';

export const useNavMenu = () => {
  const permissions = useUserStore(store => store.data?.permissions ?? []);

  const { data: externalLinks } = useGetExternalLinksQuery({ select: data => data.links });

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

  return { topMenuRoutes, externalLinks };
};
