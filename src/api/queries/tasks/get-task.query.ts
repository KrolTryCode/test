import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { FullTaskInfo } from '~/api/utils/api-requests';

export const useGetTaskQuery = (
  taskId: string,
  options?: UseCustomQueryOptions<FullTaskInfo>,
): UseQueryResult<FullTaskInfo, Error> => {
  return useQuery({
    queryKey: ['tasks', taskId],
    queryFn: async () => await ApiClientSecured.tasksV1Controller.getTask(taskId),
    ...options,
  });
};
