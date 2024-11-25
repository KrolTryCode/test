import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { TableMetadata } from '~/api/utils/api-requests';

import { tableQueries } from '../queries';

export const useGetTableMetadataColumns = <T = TableMetadata>(
  nodeId: string,
  options?: UseCustomQueryOptions<TableMetadata, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...tableQueries.metadata(nodeId),
    ...options,
  });
};
