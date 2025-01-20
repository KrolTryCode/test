import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { Table } from '~/api/utils/api-requests';

import { tableQueries } from '../queries';

export const useGetTableDataQuery = <T = Table>(
  nodeId: string,
  options?: UseCustomQueryOptions<Table, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...tableQueries.metadata(nodeId),
    ...options,
  });
};
