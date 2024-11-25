import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { PageRole } from '~/api/utils/api-requests';
import { ServerPagingParams } from '~/utils/hooks/use-server-options';

import { roleQueries } from './queries';

export const useFindPermissionsQuery = <T = PageRole>(
  pagingParams: ServerPagingParams,
  options?: UseCustomQueryOptions<PageRole, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...roleQueries.getAllPermissions._ctx.findPermissions(pagingParams),
    placeholderData: keepPreviousData,
    ...options,
  });
};
