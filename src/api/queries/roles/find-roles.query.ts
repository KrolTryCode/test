import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { PageRole } from '~/api/utils/api-requests';
import { ServerPagingParams } from '~/utils/hooks';

import { roleQueries } from './queries';

export const useFindRolesQuery = <T = PageRole>(
  pagingParams: ServerPagingParams,
  options?: UseCustomQueryOptions<PageRole, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...roleQueries.getAllRoles._ctx.findRoles(pagingParams),
    placeholderData: keepPreviousData,
    ...options,
  });
};
