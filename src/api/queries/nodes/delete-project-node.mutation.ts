import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

export const useDeleteNodeMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<void, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async nodeId => await ApiClientSecured.contentNodeV1Controller.delete1(nodeId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['project', projectId, 'nodes'] });
      options?.onSuccess?.(...args);
    },
  });
};
