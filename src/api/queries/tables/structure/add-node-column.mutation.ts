import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ColumnDefinition } from '~/api/utils/api-requests';

import { tableQueries } from '../queries';

export const useAddNodeColumnMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, unknown, ColumnDefinition>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ColumnDefinition) =>
      ApiClientSecured.contentNodeV1Controller.addColumn(nodeId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.metadata(nodeId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
