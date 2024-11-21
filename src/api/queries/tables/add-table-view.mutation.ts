import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { PairStringColumnType } from '~/api/utils/api-requests';
import { NODES_KEY, TABLE_KEY } from '~/api/utils/query-keys';

export const useAddTableViewMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, unknown, PairStringColumnType[]>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PairStringColumnType[]) =>
      await ApiClientSecured.contentNodeV1Controller.createOrReplaceView(nodeId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: [NODES_KEY, nodeId, TABLE_KEY],
      });
      options?.onSuccess?.(...args);
    },
  });
};
