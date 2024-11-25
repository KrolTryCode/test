import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ColumnConstraint } from '~/api/utils/api-requests';

import { tableQueries } from '../../queries';

export const useAddNodeConstraintMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, unknown, ColumnConstraint>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: constraintData =>
      ApiClientSecured.contentNodeV1Controller.addCheck(nodeId, constraintData),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tableQueries.metadata(nodeId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
