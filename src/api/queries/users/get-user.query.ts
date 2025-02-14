import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { User } from '~/api/utils/api-requests';

import { userQueries } from './queries';

export const getUserQueryOptions = (userId: string, options?: UseCustomQueryOptions<User>) =>
  queryOptions({
    ...userQueries.single(userId),
    gcTime: 0,
    ...options,
  });
