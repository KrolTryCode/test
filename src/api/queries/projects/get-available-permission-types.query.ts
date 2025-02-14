import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

import { projectQueries } from './queries';

export const getPermissionTypesQueryOptions = <T = string[]>(
  projectId: string,
  options?: UseCustomQueryOptions<string[], unknown, T>,
) =>
  queryOptions({
    ...projectQueries.permissionTypes(projectId),
    ...options,
  });
