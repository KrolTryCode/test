import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';
import { ServerPagingParams } from '~/utils/hooks';

export const userQueries = createQueryKeys('users', {
  current: {
    queryKey: null,
    queryFn: () => ApiClientSecured.usersV1Controller.getCurrentUser(),
  },
  active: {
    queryKey: null,
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
  avatarId: (userId: string) => ({
    queryKey: [userId],
    queryFn: () => ApiClientSecured.userFilesV1Controller.getActiveUserAvatarId(userId),
  }),
});
