import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { UserTimeZone } from '~/api/utils/api-requests';

import { userQueries } from './queries';

export const useGetTimeZoneListQuery = <T = UserTimeZone[]>(
  options?: UseCustomQueryOptions<UserTimeZone[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...userQueries.timezones,
    ...options,
  });
};
