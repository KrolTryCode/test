import { useQuery } from '@tanstack/react-query';

import { selectUserTimezone } from '~/api/selectors/select-user-timezone';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { UserWithPermissions } from '~/api/utils/api-requests';

import { userQueries } from './queries';

export const useGetCurrentUserQuery = (options?: UseCustomQueryOptions<UserWithPermissions>) =>
  useQuery({
    ...userQueries.current,
    initialData: {},
    gcTime: 0,
    ...options,
    select: data => {
      if (!data.user) {
        return data;
      }

      const tz = data.user?.userTimeZone?.systemTitle ?? 'Z';
      const user = selectUserTimezone(tz, data.user, ['lastSuccessfulLoginTime', 'createdFrom']);

      let updatedData: UserWithPermissions = { ...data, user };
      if (options?.select) {
        updatedData = options.select(data);
      }
      return updatedData;
    },
  });
