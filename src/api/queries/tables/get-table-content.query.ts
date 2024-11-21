import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { NODES_KEY, TABLE_KEY } from '~/api/utils/query-keys';

export const useGetTableContentQuery = <T = Record<string, object>[]>(
  nodeId: string,
  options?: UseCustomQueryOptions<Record<string, object>[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: [NODES_KEY, nodeId, TABLE_KEY],
    queryFn: async () =>
      await ApiClientSecured.contentNodeV1Controller.getTableContentByView(nodeId),
    ...options,
  });
};
