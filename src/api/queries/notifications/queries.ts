import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';
import { Pageable } from '~/api/utils/api-requests';
import { ServerPagingParams } from '~/utils/hooks/use-server-options';

export const notificationsQueries = createQueryKeys('notifications', {
  list: (pagingParams: ServerPagingParams) => ({
    queryKey: [{ pagingParams }],
    queryFn: () =>
      ApiClientSecured.notificationV1Controller.searchNotifications(
        { pageable: pagingParams.pageAndSort as Pageable },
        pagingParams.filters,
      ),
  }),
});
