import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { FullTaskInfo } from '~/api/utils/api-requests';

import { projectQueries } from '../queries';

export const useGetProjectTasksQuery = <T = FullTaskInfo[]>(
  projectId: string,
  options?: UseCustomQueryOptions<FullTaskInfo[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...projectQueries.tasks(projectId),
    ...options,
  });
};
