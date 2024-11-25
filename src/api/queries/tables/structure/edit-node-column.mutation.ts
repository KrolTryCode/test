import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { tableQueries } from '../queries';

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
    mutationFn: ({ columnName, newColumnName }) =>
      ApiClientSecured.contentNodeV1Controller.updateColumnName(nodeId, {
        columnName,
        newColumnName,
      }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.metadata(nodeId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
