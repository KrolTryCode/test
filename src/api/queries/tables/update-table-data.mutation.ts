import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { NODES_KEY, TABLE_KEY } from '~/api/utils/query-keys';

export interface AddTableDataRequest extends Record<string, any> {
  id: string;
}

export const useUpdateTableDataMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, unknown, AddTableDataRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddTableDataRequest) => {
      return await ApiClientSecured.contentNodeV1Controller.updateValues(
        nodeId,
        { rowId: data.id },
        // @ts-expect-error id type
        { ...data, id: undefined },
      );
    },
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: [NODES_KEY, nodeId, TABLE_KEY],
      });
      options?.onSuccess?.(...args);
    },
  });
};
