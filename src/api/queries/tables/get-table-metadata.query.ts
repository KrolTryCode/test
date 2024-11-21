import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { TableMetadata } from '~/api/utils/api-requests';
import { COLUMNS_KEY, NODES_KEY, TABLE_KEY } from '~/api/utils/query-keys';

export const useGetTableMetadataColumns = <T = TableMetadata>(
  nodeId: string,
  options?: UseCustomQueryOptions<TableMetadata, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: [NODES_KEY, nodeId, TABLE_KEY, COLUMNS_KEY],
    queryFn: async () =>
      await ApiClientSecured.contentNodeV1Controller.getTableMetadata(nodeId, { withId: true }),
    ...options,
  });
};
