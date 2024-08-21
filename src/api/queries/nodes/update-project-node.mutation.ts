import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentNode } from '~/api/utils/api-requests';

export const useUpdateProjectNodeMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<ContentNode, unknown, { nodeId: string; name: string }>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ nodeId, name }) =>
      await ApiClientSecured.contentNodeV1Controller.update(nodeId, { name }),
    ...options,
    onSuccess(data, ...args) {
      void queryClient.invalidateQueries({ queryKey: ['project', projectId, 'nodes'] });
      void queryClient.invalidateQueries({ queryKey: ['node', data.id] });
      options?.onSuccess?.(data, ...args);
    },
  });
};
