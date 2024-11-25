import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ContentSubtree } from '~/api/utils/api-requests';

import { nodeQueries } from './queries';

export const useGetProjectNodesTree = <T = ContentSubtree[]>(
  projectId: string,
  options?: UseCustomQueryOptions<ContentSubtree[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...nodeQueries.tree(projectId),
    ...options,
  });
};
