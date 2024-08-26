import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

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
      void queryClient.invalidateQueries({ queryKey: ['node', nodeId, 'columns'] });
      options?.onSuccess?.(...args);
    },
  });
};
