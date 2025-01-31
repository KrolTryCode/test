import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectContentQueries } from '~/api/queries/project-content/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

export const useDeleteProjectContentMutation = (
  options?: UseCustomMutationOptions<object, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<object, Error, string>({
    mutationFn: nodeId => ApiClientSecured.projectContentV1Controller.deleteNode(nodeId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: projectContentQueries._def });
      options?.onSuccess?.(...args);
    },
  });
};
