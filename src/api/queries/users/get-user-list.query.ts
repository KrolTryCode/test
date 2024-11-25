import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query';

import { PageUser } from '~/api/utils/api-requests';
import { ServerPagingParams } from '~/utils/hooks/use-server-options';

import { UseCustomQueryOptions } from '../../typings/react-query-helpers';

import { userQueries } from './queries';

export const useGetUserListQuery = <T = PageUser>(
  pagingParams: ServerPagingParams,
  options?: UseCustomQueryOptions<PageUser, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...userQueries.list(pagingParams),
    placeholderData: keepPreviousData,
    ...options,
  });
};
