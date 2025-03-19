import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { CreateColumnLinkRequest, TableColumnLink } from '~/api/utils/api-requests';

import { tableQueries } from '../queries';

interface ICreateColumnLinkRequest extends CreateColumnLinkRequest {
  columnId: string;
}

export const useCreateColumnLinkMutation = (
  tableId: string,
  secondTableId?: string,
  options?: UseCustomMutationOptions<TableColumnLink, unknown, ICreateColumnLinkRequest>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateColumnLinkRequest) =>
      ApiClientSecured.columnLinkV1Controller.createColumnLink(tableId, data.columnId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.metadata(tableId).queryKey });
      if (secondTableId) {
        void queryClient.invalidateQueries({
          queryKey: tableQueries.metadata(secondTableId).queryKey,
        });
      }
      options?.onSuccess?.(...args);
    },
  });
};
