import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { UserTimeZone } from '~/api/utils/api-requests';
import { USERS_KEY, TIMEZONES_KEY } from '~/api/utils/query-keys';

export const useGetTimeZoneListQuery = <T = UserTimeZone[]>(
  options?: UseCustomQueryOptions<UserTimeZone[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: [USERS_KEY, TIMEZONES_KEY],
    queryFn: async () => await ApiClientSecured.usersV1Controller.getTimeZones(),
    ...options,
  });
};
