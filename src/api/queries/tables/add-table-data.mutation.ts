import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { NODES_KEY, TABLE_KEY } from '~/api/utils/query-keys';

export const useAddTableDataMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, unknown, Record<string, any>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, any>) =>
      await ApiClientSecured.contentNodeV1Controller.insertValues(nodeId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: [NODES_KEY, nodeId, TABLE_KEY],
      });
      options?.onSuccess?.(...args);
    },
  });
};
