import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { CreateColumnRequest, TableColumn } from '~/api/utils/api-requests';

import { tableQueries } from '../queries';

export const useAddColumnMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<TableColumn, unknown, CreateColumnRequest>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateColumnRequest) =>
      ApiClientSecured.columnV1Controller.createColumn(nodeId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.metadata(nodeId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
