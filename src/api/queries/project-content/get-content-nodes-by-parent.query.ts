import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { projectContentQueries } from '~/api/queries/project-content/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ContentNode } from '~/api/utils/api-requests';

export const useGetContentNodesByParent = <T = ContentNode[]>(
  projectId: string,
  parentNodeId?: string,
  options?: UseCustomQueryOptions<ContentNode[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...projectContentQueries.contentNodesByParent(projectId, parentNodeId),
    ...options,
  });
};
