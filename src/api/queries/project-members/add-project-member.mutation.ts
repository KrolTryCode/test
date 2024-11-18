import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProjectNodeMember, CreateProjectNodeMemberRequest } from '~/api/utils/api-requests';
import { PROJECT_MEMBERS_KEY } from '~/api/utils/query-keys';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useAddProjectMemberMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<ProjectNodeMember, unknown, CreateProjectNodeMemberRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectNodeMember, unknown, CreateProjectNodeMemberRequest>({
    mutationFn: async (data: CreateProjectNodeMemberRequest) =>
      await ApiClientSecured.projectNodeMemberV1Controller.addMember(projectId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [PROJECT_MEMBERS_KEY, projectId] });
      options?.onSuccess?.(...args);
    },
  });
};
