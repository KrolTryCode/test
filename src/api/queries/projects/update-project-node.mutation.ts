import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ProjectNode } from '~/api/utils/api-requests';
import { PROJECTS_KEY } from '~/api/utils/query-keys';

export const useUpdateProjectNodeMutation = (
  options?: UseCustomMutationOptions<
    ProjectNode,
    unknown,
    { nodeId: string; name?: string; description?: string }
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ nodeId, name, description }) =>
      await ApiClientSecured.projectNodeV1Controller.update(nodeId, {
        name,
        description,
      }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
