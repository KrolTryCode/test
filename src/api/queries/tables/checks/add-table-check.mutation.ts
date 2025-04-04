import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Check, TableCheck } from '~/api/utils/api-requests';

import { tableQueries } from '../queries';

export const useAddTableCheckMutation = (
  tableId: string,
  options?: UseCustomMutationOptions<TableCheck, unknown, Check>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkData => ApiClientSecured.checkV1Controller.createCheck(tableId, checkData),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.metadata(tableId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
