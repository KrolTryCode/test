import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ContentSubtree } from '~/api/utils/api-requests';

import { nodeQueries } from './queries';

export const getProjectNodesTreeOptions = <T = ContentSubtree[]>(
  projectId: string,
  options?: UseCustomQueryOptions<ContentSubtree[], unknown, T>,
) =>
  queryOptions({
    ...nodeQueries.tree(projectId),
    ...options,
  });
