import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { projectQueries } from './queries';

export const useDeleteProjectNodeMutation = (
  options?: UseCustomMutationOptions<void, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: nodeId => ApiClientSecured.projectNodeV1Controller.deleteProjectNode(nodeId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: projectQueries._def });
      options?.onSuccess?.(...args);
    },
  });
};
