import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { tableQueries } from './queries';

export const useDeleteTableDataMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, unknown, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rowId: string) =>
      ApiClientSecured.contentNodeV1Controller.deleteValues(nodeId, { rowId }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: tableQueries.content(nodeId).queryKey,
      });
      options?.onSuccess?.(...args);
    },
  });
};
