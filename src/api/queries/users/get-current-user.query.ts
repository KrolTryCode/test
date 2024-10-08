import { useQuery } from '@tanstack/react-query';

import { UserWithPermissions } from '~/api/utils/api-requests';
import { CURRENT_KEY, USERS_KEY } from '~/api/utils/query-keys';

import { UseCustomQueryOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useGetCurrentUserQuery = (options?: UseCustomQueryOptions<UserWithPermissions>) =>
  useQuery({
    queryKey: [USERS_KEY, CURRENT_KEY],
    queryFn: async () => await ApiClientSecured.usersV1Controller.getCurrentUser(),
    initialData: {},
    gcTime: 0,
    ...options,
  });
