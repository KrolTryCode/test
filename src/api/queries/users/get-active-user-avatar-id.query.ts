import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

import { userQueries } from './queries';

export const useGetUserAvatarIdQuery = <T = string>(
  userId: string,
  options?: UseCustomQueryOptions<string, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...userQueries.avatarId(userId),
    ...options,
  });
};
