import { useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { UserWithPermissions } from '~/api/utils/api-requests';

import { userQueries } from './queries';

export const useGetCurrentUserQuery = (options?: UseCustomQueryOptions<UserWithPermissions>) =>
  useQuery({
    ...userQueries.current,
    initialData: {},
    gcTime: 0,
    ...options,
  });
