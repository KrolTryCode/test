import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ContentNode } from '~/api/utils/api-requests';

import { projectContentQueries } from './queries';

export const useGetProjectContentQuery = <T = ContentNode>(
  nodeId: string,
  options?: UseCustomQueryOptions<ContentNode, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...projectContentQueries.single(nodeId),
    ...options,
  });
};
