import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';
import { Pageable } from '~/api/utils/api-requests';
import { ServerPagingParams } from '~/utils/hooks';

export const roleQueries = createQueryKeys('roles', {
  getAllRoles: {
    queryKey: null,
    queryFn: () => ApiClientSecured.rolesV1Controller.getAllRoles(),
    contextQueries: {
      findRoles: (pagingParams: ServerPagingParams) => ({
        queryKey: [{ pagingParams }],
        queryFn: () =>
          ApiClientSecured.rolesV1Controller.findRoles(
            { pageable: pagingParams.pageAndSort as Pageable },
            pagingParams.filters,
          ),
      }),
    },
  },
  getAllPermissions: {
    queryKey: null,
    queryFn: () => ApiClientSecured.permissionsV1Controller.getAllPermissions(),
    contextQueries: {
      findPermissions: (pagingParams: ServerPagingParams) => ({
        queryKey: [{ pagingParams }],
        queryFn: () =>
          ApiClientSecured.permissionsV1Controller.findPermissions(
            {
              pageable: pagingParams.pageAndSort as Pageable,
            },
            pagingParams.filters,
          ),
      }),
    },
  },
});
