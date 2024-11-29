import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';
import { ServerPagingParams } from '~/utils/hooks/use-server-options';

export const userQueries = createQueryKeys('users', {
  current: {
    queryKey: ['current'],
    queryFn: () => ApiClientSecured.usersV1Controller.getCurrentUser(),
  },
  active: {
    queryKey: ['active'],
    queryFn: () => ApiClientSecured.usersV2Controller.getActiveUsers(),
  },
  single: (userId: string) => ({
    queryKey: [userId],
    queryFn: () => ApiClientSecured.usersV1Controller.getUser(userId),
  }),
  list: (pagingParams: ServerPagingParams) => ({
    queryKey: [{ pagingParams }],
    queryFn: () =>
      ApiClientSecured.usersV2Controller.searchUsersFiltered(
        pagingParams.filters,
        pagingParams.pageAndSort,
      ),
  }),
  timezones: {
    queryKey: ['timezones'],
    queryFn: () => ApiClientSecured.usersV1Controller.getTimeZones(),
  },
  avatarId: (userId: string) => ({
    queryKey: [userId, 'avatar'],
    queryFn: () => ApiClientSecured.userFilesV1Controller.getActiveUserAvatarId(userId),
  }),
});
