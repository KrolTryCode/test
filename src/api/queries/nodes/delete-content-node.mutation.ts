import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { nodeQueries } from './queries';

export const useDeleteContentNodeMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<void, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: nodeId => ApiClientSecured.contentNodeV1Controller.deleteContentNode(nodeId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: nodeQueries.list(projectId).queryKey });
      void queryClient.invalidateQueries({ queryKey: nodeQueries.tree(projectId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
