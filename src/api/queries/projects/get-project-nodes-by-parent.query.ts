import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ProjectNode } from '~/api/utils/api-requests';

import { projectQueries } from './queries';

export const getProjectNodesByParentQueryOptions = <T = ProjectNode[]>(
  parentNodeId?: string,
  options?: UseCustomQueryOptions<ProjectNode[], unknown, T>,
) =>
  queryOptions({
    ...projectQueries.byParent(parentNodeId),
    ...options,
  });
