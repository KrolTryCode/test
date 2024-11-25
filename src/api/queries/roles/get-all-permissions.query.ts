import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { Permission } from '~/api/utils/api-requests';

import { roleQueries } from './queries';

export const useGetAllPermissionsQuery = <T = Permission[]>(
  options?: UseCustomQueryOptions<Permission[], unknown, T>,
): UseQueryResult<T, unknown> =>
  useQuery({
    ...roleQueries.getAllPermissions,
    placeholderData: keepPreviousData,
    ...options,
  });
