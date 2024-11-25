import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { User } from '~/api/utils/api-requests';

import { userQueries } from './queries';

export const useGetUserQuery = (
  userId: string,
  options?: UseCustomQueryOptions<User>,
): UseQueryResult<User, unknown> => {
  return useQuery({
    ...userQueries.single(userId),
    gcTime: 0,
    ...options,
  });
};
