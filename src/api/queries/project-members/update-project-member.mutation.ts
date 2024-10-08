import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FullProjectMemberInfo, ProjectMember } from '~/api/utils/api-requests';
import { PROJECT_MEMBERS_KEY } from '~/api/utils/query-keys';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

type UpdateProjectMemberMutationData = Pick<
  FullProjectMemberInfo,
  'userId' | 'roleId' | 'expirationTime'
>;

export const useUpdateProjectMemberMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<ProjectMember, unknown, UpdateProjectMemberMutationData>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectMember, unknown, UpdateProjectMemberMutationData>({
    mutationFn: async (data: UpdateProjectMemberMutationData) =>
      await ApiClientSecured.projectMembersV1Controller.updateMember(
        projectId,
        data.userId ?? '',
        data,
      ),
    gcTime: 0,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [PROJECT_MEMBERS_KEY, { projectId }] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};
