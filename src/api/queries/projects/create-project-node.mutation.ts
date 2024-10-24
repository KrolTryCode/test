import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { CreateProjectNodeRequest, ProjectNode } from '~/api/utils/api-requests';
import { PROJECTS_KEY } from '~/api/utils/query-keys';

export const useCreateProjectNodeMutation = (
  options?: UseCustomMutationOptions<ProjectNode, unknown, CreateProjectNodeRequest>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateProjectNodeRequest) =>
      await ApiClientSecured.projectNodeV1Controller.create1(data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
