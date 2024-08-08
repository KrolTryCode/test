import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Pageable, PageRole } from '~/api/utils/api-requests';
import { GridPagingParams } from '~/ui-components/datagrid/datagrid.types';
import { useServerPagingParams } from '~/utils/use-server-options.hook';

export const useFindRolesQuery = <T = PageRole>(
  gridPagingParams?: GridPagingParams,
  options?: UseCustomQueryOptions<PageRole, unknown, T>,
): UseQueryResult<T, unknown> => {
  const serverPagingParams = useServerPagingParams(gridPagingParams);

  return useQuery({
    queryKey: ['roles', serverPagingParams],
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
