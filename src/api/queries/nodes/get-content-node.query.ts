import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentNode } from '~/api/utils/api-requests';

export const useGetContentNode = <T = ContentNode>(
  nodeId: string,
  options?: UseCustomQueryOptions<ContentNode, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: ['node', nodeId],
    queryFn: async () => await ApiClientSecured.contentNodeV1Controller.getContentNodeById(nodeId),
    ...options,
  });
};
