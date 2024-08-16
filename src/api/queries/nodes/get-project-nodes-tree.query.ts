import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentSubtree } from '~/api/utils/api-requests';

export const useGetProjectNodesTree = <T = ContentSubtree[]>(
  projectId: string,
  options?: UseCustomQueryOptions<ContentSubtree[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: ['project', projectId, 'nodes'],
    queryFn: async () =>
      await ApiClientSecured.contentNodeV1Controller.getNodesTreeByProject({ projectId }),
    ...options,
  });
};
