import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ContentNode } from '~/api/utils/api-requests';

import { projectContentQueries } from './queries';

export const getProjectContentQueryOptions = <T = ContentNode>(
  nodeId: string,
  options?: UseCustomQueryOptions<ContentNode, unknown, T>,
) =>
  queryOptions({
    ...projectContentQueries.single(nodeId),
    ...options,
  });
