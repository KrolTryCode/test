import { queryOptions } from '@tanstack/react-query';

import { projectContentQueries } from '~/api/queries/project-content/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ContentNode } from '~/api/utils/api-requests';

export const getContentNodesByParentQueryOptions = <T = ContentNode[]>(
  projectId: string,
  parentNodeId?: string,
  options?: UseCustomQueryOptions<ContentNode[], unknown, T>,
) =>
  queryOptions({
    ...projectContentQueries.contentNodesByParent(projectId, parentNodeId),
    ...options,
  });
