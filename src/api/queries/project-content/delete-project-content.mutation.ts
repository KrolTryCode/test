import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { nodeQueries } from '../nodes/queries';

export const useDeleteProjectContentMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<object, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<object, Error, string>({
    mutationFn: nodeId => ApiClientSecured.projectContentV1Controller.deleteNode(nodeId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: nodeQueries.list(projectId).queryKey });
      void queryClient.invalidateQueries({ queryKey: nodeQueries.tree(projectId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
