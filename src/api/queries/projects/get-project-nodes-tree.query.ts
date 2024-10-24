import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ProjectSubtree } from '~/api/utils/api-requests';
import { PROJECTS_KEY } from '~/api/utils/query-keys';

export const useGetProjectNodesTree = <T = ProjectSubtree[]>(
  options?: UseCustomQueryOptions<ProjectSubtree[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: [PROJECTS_KEY],
    queryFn: async () => await ApiClientSecured.projectNodeV1Controller.getNodesTree(),
    ...options,
  });
};
