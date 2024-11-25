import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { User } from '~/api/utils/api-requests';

import { userQueries } from './queries';

export const useGetActiveUsersQuery = <T = User[]>(
  options?: UseCustomQueryOptions<User[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...userQueries.active,
    placeholderData: keepPreviousData,
    ...options,
  });
};
