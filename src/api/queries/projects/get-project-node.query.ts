import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ProjectNode } from '~/api/utils/api-requests';
import { PROJECTS_KEY } from '~/api/utils/query-keys';

export const useGetProjectNode = <T = ProjectNode>(
  projectId: string,
  options?: UseCustomQueryOptions<ProjectNode, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: [PROJECTS_KEY, projectId],
    queryFn: async () =>
      await ApiClientSecured.projectNodeV1Controller.getProjectNodeById(projectId),
    ...options,
  });
};
