import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { FullTaskInfo } from '~/api/utils/api-requests';

export const useGetActiveTasksQuery = (
  options?: UseCustomQueryOptions<FullTaskInfo[]>,
): UseQueryResult<FullTaskInfo[], unknown> => {
  return useQuery({
    queryKey: ['tasks', 'all'],
    queryFn: async () => await ApiClientSecured.tasksV1Controller.getActiveTasks(),
    ...options,
  });
};
