import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

interface EditNodeColumnNameVariables {
  columnName: string;
  newColumnName: string;
}

export const useEditNodeColumnNameMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, unknown, EditNodeColumnNameVariables>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ columnName, newColumnName }: EditNodeColumnNameVariables) =>
      await ApiClientSecured.contentNodeV1Controller.updateColumnName(nodeId, {
        columnName,
        newColumnName,
      }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['node', nodeId, 'columns'] });
      options?.onSuccess?.(...args);
    },
  });
};
