import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentNode, CreateContentNodeRequest } from '~/api/utils/api-requests';

import { nodeQueries } from './queries';

export const useCreateContentNodeMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<ContentNode, unknown, CreateContentNodeRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data =>
      ApiClientSecured.contentNodeV1Controller.createContentNode({ projectId, ...data }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: nodeQueries.list(projectId).queryKey });
      void queryClient.invalidateQueries({ queryKey: nodeQueries.tree(projectId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
