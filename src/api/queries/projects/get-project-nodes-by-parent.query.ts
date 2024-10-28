import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ProjectNode } from '~/api/utils/api-requests';
import { PROJECTS_KEY } from '~/api/utils/query-keys';

export const useGetProjectNodesByParent = <T = ProjectNode[]>(
  parentNodeId?: string,
  options?: UseCustomQueryOptions<ProjectNode[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: [PROJECTS_KEY, parentNodeId],
    queryFn: async () =>
      await ApiClientSecured.projectNodeV1Controller.getChildrenByParent({ parentNodeId }),
    ...options,
  });
};
