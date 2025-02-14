import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { PageRole } from '~/api/utils/api-requests';
import { ServerPagingParams } from '~/utils/hooks';

import { roleQueries } from './queries';

export const findRolesQueryOptions = <T = PageRole>(
  pagingParams: ServerPagingParams,
  options?: UseCustomQueryOptions<PageRole, unknown, T>,
) =>
  queryOptions({
    ...roleQueries.getAllRoles._ctx.findRoles(pagingParams),
    placeholderData: keepPreviousData,
    ...options,
  });
