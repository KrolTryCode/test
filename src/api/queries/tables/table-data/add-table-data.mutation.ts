import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { tableQueries } from '../queries';

export const useAddTableDataMutation = (
  tableId: string,
  options?: UseCustomMutationOptions<string[], unknown, Record<string, any>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...tableQueries._def, 'create'],
    mutationFn: (data: Record<string, any>) =>
      ApiClientSecured.tableV1Controller.insertRecords(tableId, [data]),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: tableQueries.content(tableId).queryKey,
      });
      options?.onSuccess?.(...args);
    },
  });
};
