import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { UserWithPermissions } from '~/api/utils/api-requests';

import { userQueries } from './queries';

export const getCurrentUserQueryOptions = (options?: UseCustomQueryOptions<UserWithPermissions>) =>
  queryOptions({
    ...userQueries.current,
    initialData: {},
    gcTime: 0,
    ...options,
  });
