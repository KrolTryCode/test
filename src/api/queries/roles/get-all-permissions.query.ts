import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { Permission } from '~/api/utils/api-requests';

import { roleQueries } from './queries';

export const getAllPermissionsQueryOptions = <T = Permission[]>(
  options?: UseCustomQueryOptions<Permission[], unknown, T>,
) =>
  queryOptions({
    ...roleQueries.getAllPermissions,
    placeholderData: keepPreviousData,
    ...options,
  });
