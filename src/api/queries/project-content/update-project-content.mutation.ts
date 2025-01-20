import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentNode } from '~/api/utils/api-requests';

import { nodeQueries } from '../nodes/queries';

export const useUpdateProjectContentMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<ContentNode, unknown, { nodeId: string; name: string }>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ nodeId, name }) =>
      ApiClientSecured.projectContentV1Controller.updateNode(nodeId, {
        name,
      }),
    ...options,
    onSuccess(data, ...args) {
      void queryClient.invalidateQueries({ queryKey: nodeQueries.list(projectId).queryKey });
      void queryClient.invalidateQueries({ queryKey: nodeQueries.tree(projectId).queryKey });
      options?.onSuccess?.(data, ...args);
    },
  });
};
