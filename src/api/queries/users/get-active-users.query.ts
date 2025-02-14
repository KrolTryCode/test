import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { User } from '~/api/utils/api-requests';

import { userQueries } from './queries';

export const getActiveUsersQueryOptions = <T = User[]>(
  options?: UseCustomQueryOptions<User[], unknown, T>,
) =>
  queryOptions({
    ...userQueries.active,
    placeholderData: keepPreviousData,
    ...options,
  });
