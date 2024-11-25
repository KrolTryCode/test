import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProjectNodeMember } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { projectMemberQueries } from './queries';

export const useArchiveProjectMemberMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<ProjectNodeMember, unknown, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectNodeMember, unknown, string>({
    mutationFn: userId =>
      ApiClientSecured.projectNodeMemberV1Controller.archiveMember(projectId, userId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: projectMemberQueries.list(projectId).queryKey,
      });
      options?.onSuccess?.(...args);
    },
  });
};
