import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

import { userQueries } from './queries';

export const getUserAvatarIdQueryOptions = <T = string>(
  userId: string,
  options?: UseCustomQueryOptions<string, unknown, T>,
) =>
  queryOptions({
    ...userQueries.avatarId(userId),
    ...options,
  });
