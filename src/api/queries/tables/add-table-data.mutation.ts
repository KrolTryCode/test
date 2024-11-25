import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { tableQueries } from './queries';

export const useAddTableDataMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, unknown, Record<string, any>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, any>) =>
      ApiClientSecured.contentNodeV1Controller.insertValues(nodeId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: tableQueries.content(nodeId).queryKey,
      });
      options?.onSuccess?.(...args);
    },
  });
};
