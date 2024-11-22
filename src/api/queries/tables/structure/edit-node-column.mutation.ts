import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { COLUMNS_KEY, NODES_KEY, TABLE_KEY } from '~/api/utils/query-keys';

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
      void queryClient.invalidateQueries({ queryKey: [NODES_KEY, nodeId, TABLE_KEY, COLUMNS_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
