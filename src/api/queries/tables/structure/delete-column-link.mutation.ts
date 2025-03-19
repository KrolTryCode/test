import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { tableQueries } from '../queries';

interface IDeleteColumnLinkRequest {
  columnId: string;
  linkId: string;
}

export const useDeleteColumnLinkMutation = (
  tableId: string,
  options?: UseCustomMutationOptions<void, unknown, IDeleteColumnLinkRequest>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ columnId, linkId }: IDeleteColumnLinkRequest) =>
      ApiClientSecured.columnLinkV1Controller.deleteColumnLink(tableId, columnId, linkId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.metadata(tableId).queryKey });
      // todo: invalidate otherTableId metadata
      options?.onSuccess?.(...args);
    },
  });
};
