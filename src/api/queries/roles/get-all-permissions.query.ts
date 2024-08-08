import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Permission } from '~/api/utils/api-requests';

export const useGetAllPermissionsQuery = <T = Permission[]>(
  options?: UseCustomQueryOptions<Permission[], unknown, T>,
): UseQueryResult<T, unknown> =>
  useQuery({
    queryKey: ['roles', 'permissions', 'all'],
    queryFn: async () => await ApiClientSecured.permissionsV1Controller.getAllPermissions(),
    placeholderData: keepPreviousData,
    ...options,
  });
