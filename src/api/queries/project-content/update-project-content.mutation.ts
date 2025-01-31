import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectContentQueries } from '~/api/queries/project-content/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentNode } from '~/api/utils/api-requests';

export const useUpdateProjectContentMutation = (
  options?: UseCustomMutationOptions<ContentNode, unknown, { nodeId: string; name: string }>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ nodeId, name }) =>
      ApiClientSecured.projectContentV1Controller.updateNode(nodeId, { name }),
    ...options,
    onSuccess(data, ...args) {
      void queryClient.invalidateQueries({ queryKey: projectContentQueries._def });
      options?.onSuccess?.(data, ...args);
    },
  });
};
