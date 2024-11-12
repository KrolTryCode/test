import { useQuery } from '@tanstack/react-query';

import { selectUserTimezone } from '~/api/selectors/select-user-timezone';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { UserWithPermissions } from '~/api/utils/api-requests';
import { CURRENT_KEY, USERS_KEY } from '~/api/utils/query-keys';
import { getTz } from '~/utils/date/apply-tz-offset';

export const useGetCurrentUserQuery = (options?: UseCustomQueryOptions<UserWithPermissions>) =>
  useQuery({
    queryKey: [USERS_KEY, CURRENT_KEY],
    queryFn: async () => await ApiClientSecured.usersV1Controller.getCurrentUser(),
    initialData: {},
    gcTime: 0,
    ...options,
    select: data => {
      if (!data.user) {
        return data;
      }

      const tz = getTz(data.user?.userTimeZone?.title);
      const user = selectUserTimezone(tz, data.user, ['lastSuccessfulLoginTime', 'createdFrom']);

      let updatedData: UserWithPermissions = { ...data, user };
      if (options?.select) {
        updatedData = options.select(data);
      }
      return updatedData;
    },
  });
