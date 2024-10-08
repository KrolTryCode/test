import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query';

import { PageUser } from '~/api/utils/api-requests';
import { USERS_KEY } from '~/api/utils/query-keys';
import { GridPagingParams } from '~/ui-components/datagrid/datagrid.types';
import { useServerPagingParams } from '~/utils/hooks/use-server-options';

import { UseCustomQueryOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useGetUsersQuery = <T = PageUser>(
  gridPagingParams?: GridPagingParams,
  options?: UseCustomQueryOptions<PageUser, unknown, T>,
): UseQueryResult<T, unknown> => {
  const serverPagingParams = useServerPagingParams(gridPagingParams);

  return useQuery({
    queryKey: [USERS_KEY, serverPagingParams],
    queryFn: async () =>
      await ApiClientSecured.usersV2Controller.searchUsersFiltered(
        serverPagingParams.filters,
        serverPagingParams.pageAndSort,
      ),
    placeholderData: keepPreviousData,
    ...options,
  });
};
