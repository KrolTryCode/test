import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { tableQueries } from '../queries';

export const useDeleteColumnMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<object, Error, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation<object, Error, string>({
    mutationFn: columnId => ApiClientSecured.columnV1Controller.deleteColumn(nodeId, columnId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.metadata(nodeId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
