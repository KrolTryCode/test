import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ProjectNode } from '~/api/utils/api-requests';

import { projectQueries } from './queries';

export const useUpdateProjectNodeMutation = (
  options?: UseCustomMutationOptions<
    ProjectNode,
    unknown,
    { nodeId: string; name?: string; description?: string }
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ nodeId, name, description }) =>
      ApiClientSecured.projectNodeV1Controller.updateProjectNode(nodeId, {
        name,
        description,
      }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: projectQueries._def });
      options?.onSuccess?.(...args);
    },
  });
};
