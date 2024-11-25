import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

import { tableQueries } from './queries';

export const useGetTableContentQuery = <T = Record<string, object>[]>(
  nodeId: string,
  options?: UseCustomQueryOptions<Record<string, object>[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...tableQueries.content(nodeId),
    ...options,
  });
};
