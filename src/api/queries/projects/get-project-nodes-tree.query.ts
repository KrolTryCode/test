import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ProjectNode } from '~/api/utils/api-requests';

import { projectQueries } from './queries';

export const useGetProjectNodesTreeQuery = <T = ProjectNode[]>(
  options?: UseCustomQueryOptions<ProjectNode[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...projectQueries.tree(),
    ...options,
  });
};
