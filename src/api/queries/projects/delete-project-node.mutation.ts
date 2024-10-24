import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { PROJECTS_KEY } from '~/api/utils/query-keys';

export const useDeleteProjectNodeMutation = (
  options?: UseCustomMutationOptions<void, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async nodeId => await ApiClientSecured.projectNodeV1Controller.delete(nodeId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
