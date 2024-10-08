import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { FullTaskInfo } from '~/api/utils/api-requests';
import { ALL_KEY, TASKS_KEY } from '~/api/utils/query-keys';

export const useGetActiveTasksQuery = (
  options?: UseCustomQueryOptions<FullTaskInfo[]>,
): UseQueryResult<FullTaskInfo[], unknown> => {
  return useQuery({
    queryKey: [TASKS_KEY, ALL_KEY],
    queryFn: async () => await ApiClientSecured.tasksV1Controller.getActiveTasks(),
    ...options,
  });
};
