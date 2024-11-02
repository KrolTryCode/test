import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FullProjectNodeMemberInfo, ProjectNodeMember } from '~/api/utils/api-requests';
import { PROJECT_MEMBERS_KEY } from '~/api/utils/query-keys';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

type UpdateProjectNodeMemberMutationData = Pick<
  FullProjectNodeMemberInfo,
  'userId' | 'roleId' | 'expirationTime'
>;

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
    mutationFn: async (data: UpdateProjectNodeMemberMutationData) =>
      await ApiClientSecured.projectNodeMemberV1Controller.updateMember(
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
