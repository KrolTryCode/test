import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { CreateProjectNodeRequest, ProjectNode } from '~/api/utils/api-requests';

import { projectQueries } from './queries';

export const useCreateProjectNodeMutation = (
  options?: UseCustomMutationOptions<ProjectNode, unknown, CreateProjectNodeRequest>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: data => ApiClientSecured.projectNodeV1Controller.createProjectNode(data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: projectQueries._def });
      options?.onSuccess?.(...args);
    },
  });
};
