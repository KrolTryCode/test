import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { projectQueries } from '~/api/queries/projects/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { FullTaskInfo } from '~/api/utils/api-requests';

export const useGetProjectTaskQuery = <T = FullTaskInfo>(
  taskId: string,
  options?: UseCustomQueryOptions<FullTaskInfo, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...projectQueries.task(taskId),
    ...options,
  });
};
