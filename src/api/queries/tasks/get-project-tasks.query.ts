import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { FullTaskInfo } from '~/api/utils/api-requests';
import { ALL_KEY, TASKS_KEY } from '~/api/utils/query-keys';

export const useGetProjectTasksQuery = (
  projectId: string,
  options?: UseCustomQueryOptions<FullTaskInfo[]>,
): UseQueryResult<FullTaskInfo[], unknown> => {
  return useQuery({
    queryKey: [TASKS_KEY, ALL_KEY, { projectId: projectId }],
    queryFn: async () => await ApiClientSecured.projectTasksV1Controller.getProjectTasks(projectId),
    enabled: projectId !== '',
    ...options,
  });
};
