import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentNode, CreateContentNodeRequest } from '~/api/utils/api-requests';

export const useCreateProjectNodeMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<ContentNode, unknown, CreateContentNodeRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateContentNodeRequest) =>
      await ApiClientSecured.contentNodeV1Controller.create4(data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['project', projectId, 'nodes'] });
      options?.onSuccess?.(...args);
    },
  });
};
