import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProjectNodeMember, CreateProjectNodeMemberRequest } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { projectMemberQueries } from './queries';

export const useAddProjectMemberMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<ProjectNodeMember, unknown, CreateProjectNodeMemberRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectNodeMember, unknown, CreateProjectNodeMemberRequest>({
    mutationFn: data => ApiClientSecured.projectNodeMemberV1Controller.addMember(projectId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: projectMemberQueries.list(projectId).queryKey,
      });
      options?.onSuccess?.(...args);
    },
  });
};
