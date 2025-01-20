import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { TableColumn } from '~/api/utils/api-requests';

import { tableQueries } from '../queries';

interface EditColumnNameVariables {
  columnId: string;
  newColumnName: string;
}

export const useEditColumnNameMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<TableColumn, unknown, EditColumnNameVariables>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ columnId, newColumnName }) =>
      ApiClientSecured.columnV1Controller.updateColumn(nodeId, columnId, { name: newColumnName }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.metadata(nodeId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
