import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { User } from '~/api/utils/api-requests';

export const useGetUserQuery = (
  userId: string,
  options?: UseCustomQueryOptions<User>,
): UseQueryResult<User, unknown> => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => await ApiClientSecured.usersV1Controller.getUser(userId),
    gcTime: 0,
    ...options,
  });
};
