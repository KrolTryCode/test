import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectContentQueries } from '~/api/queries/project-content/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentNode, CreateContentNodeRequest } from '~/api/utils/api-requests';

export const useCreateProjectContentMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<ContentNode, unknown, CreateContentNodeRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => ApiClientSecured.projectContentV1Controller.createNode(projectId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: projectContentQueries._def });
      options?.onSuccess?.(...args);
    },
  });
};
