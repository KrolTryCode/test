import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { TableMetadata } from '~/api/utils/api-requests';

export const useGetNodeColumns = <T = TableMetadata>(
  nodeId: string,
  options?: UseCustomQueryOptions<TableMetadata, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: ['node', nodeId, 'columns'],
    queryFn: async () => await ApiClientSecured.contentNodeV1Controller.getTableMetadata(nodeId),
    ...options,
  });
};
