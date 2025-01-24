import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { tableQueries } from '../../queries';

export const useDeleteCheckMutation = (
  tableId: string,
  options?: UseCustomMutationOptions<object, unknown, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: constraintName =>
      ApiClientSecured.checkV1Controller.deleteCheck1(tableId, constraintName),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.metadata(tableId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
