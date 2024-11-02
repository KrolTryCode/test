import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { NODES_KEY, PROJECTS_KEY } from '~/api/utils/query-keys';

export const useDeleteContentNodeMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<void, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async nodeId =>
      await ApiClientSecured.contentNodeV1Controller.deleteContentNode(nodeId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY, projectId, NODES_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
