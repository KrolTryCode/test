import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { COLUMNS_KEY, NODES_KEY } from '~/api/utils/query-keys';

export const useDeleteNodeColumnMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, Error, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async columnName =>
      await ApiClientSecured.contentNodeV1Controller.dropColumn(nodeId, { columnName }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [NODES_KEY, nodeId, COLUMNS_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
