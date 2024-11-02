import { GridPagingParams } from '@pspod/ui-components';
import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Pageable, PageRole } from '~/api/utils/api-requests';
import { ROLES_KEY } from '~/api/utils/query-keys';
import { useServerPagingParams } from '~/utils/hooks/use-server-options';

export const useFindRolesQuery = <T = PageRole>(
  gridPagingParams?: GridPagingParams,
  options?: UseCustomQueryOptions<PageRole, unknown, T>,
): UseQueryResult<T, unknown> => {
  const serverPagingParams = useServerPagingParams(gridPagingParams);

  return useQuery({
    queryKey: [ROLES_KEY, serverPagingParams],
    queryFn: async () =>
      await ApiClientSecured.rolesV1Controller.findRoles(
        {
          pageable: serverPagingParams.pageAndSort as Pageable,
        },
        serverPagingParams.filters,
      ),
    placeholderData: keepPreviousData,
    ...options,
  });
};
