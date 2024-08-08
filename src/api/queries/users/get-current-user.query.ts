import { useQuery } from '@tanstack/react-query';

import { UserWithPermissions } from '~/api/utils/api-requests';

import { UseCustomQueryOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useGetCurrentUserQuery = (options?: UseCustomQueryOptions<UserWithPermissions>) =>
  useQuery({
    queryKey: ['accounts', 'current'],
    queryFn: async () => await ApiClientSecured.usersV1Controller.getCurrentUser(),
    initialData: {},
    gcTime: 0,
    ...options,
  });
