import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { FullTaskFileInfo } from '~/api/utils/api-requests';
import { FILES_KEY, TASKS_KEY } from '~/api/utils/query-keys';

export const useGetTaskFilesQuery = <T = FullTaskFileInfo[]>(
  taskId: string,
  options?: UseCustomQueryOptions<FullTaskFileInfo[], unknown, T>,
): UseQueryResult<T, unknown> =>
  useQuery({
    queryKey: [TASKS_KEY, taskId, FILES_KEY],
    queryFn: async () => await ApiClientSecured.tasksV1Controller.getTaskFiles(taskId),
    ...options,
  });
