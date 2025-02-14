import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

import { tableQueries } from '../queries';

export const getTableContentQueryOptions = <T = Record<string, object>[]>(
  nodeId: string,
  options?: UseCustomQueryOptions<Record<string, object>[], unknown, T>,
) =>
  queryOptions({
    ...tableQueries.content(nodeId),
    ...options,
  });
