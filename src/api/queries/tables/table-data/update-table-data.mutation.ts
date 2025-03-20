import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { tableQueries } from '../queries';

export interface AddTableDataRequest extends Record<string, any> {
  id: string;
}

export const useUpdateTableDataMutation = (
  tableId: string,
  options?: UseCustomMutationOptions<void, unknown, AddTableDataRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...tableQueries._def, 'update'],
    mutationFn: data =>
      ApiClientSecured.tableV1Controller.updateRecord(
        tableId,
        data.id,
        // @ts-expect-error id type
        { ...data, id: undefined },
      ),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.content(tableId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
