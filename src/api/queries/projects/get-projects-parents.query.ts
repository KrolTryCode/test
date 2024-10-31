import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ProjectNode } from '~/api/utils/api-requests';
import { PROJECT_CHILDREN_KEY, PROJECTS_KEY } from '~/api/utils/query-keys';

export const useGetParents = <T = ProjectNode[]>(
  projectId: string,
  options?: UseCustomQueryOptions<ProjectNode[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: [PROJECTS_KEY, projectId, PROJECT_CHILDREN_KEY],
    queryFn: async () =>
      await ApiClientSecured.projectNodeV1Controller.getParentsByChild({ childNodeId: projectId }),
    ...options,
  });
};
