import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProjectNodeMember } from '~/api/utils/api-requests';
import { PROJECT_MEMBERS_KEY } from '~/api/utils/query-keys';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useArchiveProjectMemberMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<ProjectNodeMember, unknown, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectNodeMember, unknown, string>({
    mutationFn: async (userId: string) =>
      await ApiClientSecured.projectNodeMemberV1Controller.archiveMember(projectId, userId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [PROJECT_MEMBERS_KEY, projectId] });
      options?.onSuccess?.(...args);
    },
  });
};
