import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ColumnDefinition } from '~/api/utils/api-requests';
import { COLUMNS_KEY, NODES_KEY } from '~/api/utils/query-keys';

export const useAddNodeColumnMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, unknown, ColumnDefinition>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ColumnDefinition) =>
      await ApiClientSecured.contentNodeV1Controller.addColumn(nodeId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [NODES_KEY, nodeId, COLUMNS_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
