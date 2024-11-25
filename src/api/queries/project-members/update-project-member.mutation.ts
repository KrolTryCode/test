import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProjectNodeMember, UpdateProjectNodeMemberRequest } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { projectMemberQueries } from './queries';

type UpdateProjectNodeMemberMutationData = UpdateProjectNodeMemberRequest & { userId: string };

export const useUpdateProjectMemberMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<
    ProjectNodeMember,
    unknown,
    UpdateProjectNodeMemberMutationData
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectNodeMember, unknown, UpdateProjectNodeMemberMutationData>({
    mutationFn: data =>
      ApiClientSecured.projectNodeMemberV1Controller.updateMember(projectId, data.userId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: projectMemberQueries.list(projectId).queryKey,
      });
      options?.onSuccess?.(...args);
    },
  });
};
