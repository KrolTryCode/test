import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { COLUMNS_KEY, NODES_KEY } from '~/api/utils/query-keys';

export const useDeleteNodeConstraintMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, unknown, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (constraintName: string) =>
      await ApiClientSecured.contentNodeV1Controller.deleteCheck(nodeId, { constraintName }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [NODES_KEY, nodeId, COLUMNS_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
