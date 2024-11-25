import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { PairStringColumnType } from '~/api/utils/api-requests';

import { tableQueries } from './queries';

export const useAddTableViewMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, unknown, PairStringColumnType[]>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => ApiClientSecured.contentNodeV1Controller.createOrReplaceView(nodeId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.metadata(nodeId).queryKey });
      void queryClient.invalidateQueries({ queryKey: tableQueries.content(nodeId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
