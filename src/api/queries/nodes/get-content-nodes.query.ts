import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentNode } from '~/api/utils/api-requests';

export const useGetContentNodes = <T = ContentNode[]>(
  projectId: string,
  parentNodeId?: string,
  options?: UseCustomQueryOptions<ContentNode[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: ['project', projectId, 'nodes', parentNodeId],
    queryFn: async () =>
      await ApiClientSecured.contentNodeV1Controller.getContentNodesByProject({
        projectId,
        parentNodeId,
      }),
    ...options,
  });
};
