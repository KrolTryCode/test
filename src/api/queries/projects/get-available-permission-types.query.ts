import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

import { projectQueries } from './queries';

export const useGetPermissionTypesQuery = <T = string[]>(
  projectId: string,
  options?: UseCustomQueryOptions<string[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...projectQueries.permissionTypes(projectId),
    ...options,
  });
};
