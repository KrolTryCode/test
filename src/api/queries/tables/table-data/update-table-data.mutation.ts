import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { tableQueries } from '../queries';

export interface AddTableDataRequest extends Record<string, any> {
  id: string;
}

export const useUpdateTableDataMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<object, unknown, AddTableDataRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data =>
      ApiClientSecured.tableV1Controller.updateRecord(
        nodeId,
        data.id,
        // @ts-expect-error id type
        { ...data, id: undefined },
      ),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.content(nodeId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
