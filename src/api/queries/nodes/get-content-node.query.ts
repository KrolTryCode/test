import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ContentNode } from '~/api/utils/api-requests';

import { nodeQueries } from './queries';

export const useGetContentNodeQuery = <T = ContentNode>(
  nodeId: string,
  options?: UseCustomQueryOptions<ContentNode, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...nodeQueries.single(nodeId),
    ...options,
  });
};
