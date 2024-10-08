import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentNode } from '~/api/utils/api-requests';
import { NODES_KEY } from '~/api/utils/query-keys';

export const useGetContentNode = <T = ContentNode>(
  nodeId: string,
  options?: UseCustomQueryOptions<ContentNode, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: [NODES_KEY, nodeId],
    queryFn: async () => await ApiClientSecured.contentNodeV1Controller.getContentNodeById(nodeId),
    ...options,
  });
};
