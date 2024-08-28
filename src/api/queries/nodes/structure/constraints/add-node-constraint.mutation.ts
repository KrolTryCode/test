import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ColumnConstraint } from '~/api/utils/api-requests';

export const useAddNodeConstraintMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<void, unknown, ColumnConstraint>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (constraintData: ColumnConstraint) =>
      await ApiClientSecured.contentNodeV1Controller.addCheck(nodeId, constraintData),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['node', nodeId, 'columns'] });
      options?.onSuccess?.(...args);
    },
  });
};
