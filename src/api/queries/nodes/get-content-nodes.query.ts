import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ContentNode } from '~/api/utils/api-requests';

import { nodeQueries } from './queries';

export const useGetContentNodes = <T = ContentNode[]>(
  projectId: string,
  parentNodeId?: string,
  options?: UseCustomQueryOptions<ContentNode[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...nodeQueries.list(projectId, parentNodeId),
    ...options,
  });
};
