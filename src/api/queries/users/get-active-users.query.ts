import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query';

import { User } from '~/api/utils/api-requests';
import { USERS_KEY, ACTIVE_KEY } from '~/api/utils/query-keys';

import { UseCustomQueryOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useGetActiveUsersQuery = <T = User[]>(
  options?: UseCustomQueryOptions<User[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: [USERS_KEY, ACTIVE_KEY],
    queryFn: async () => await ApiClientSecured.usersV2Controller.getActiveUsers(),
    placeholderData: keepPreviousData,
    ...options,
  });
};
