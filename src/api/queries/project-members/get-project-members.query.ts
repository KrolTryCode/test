import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { FullProjectMemberInfo } from '~/api/utils/api-requests';

import { UseCustomQueryOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useGetProjectMembersQuery = (
  projectId: string,
  options?: UseCustomQueryOptions<FullProjectMemberInfo[]>,
): UseQueryResult<FullProjectMemberInfo[], unknown> => {
  return useQuery({
    queryKey: ['project-members', 'all', { projectId: projectId }],
    queryFn: async () => await ApiClientSecured.projectMembersV1Controller.getAllMembers(projectId),
    enabled: projectId !== '',
    ...options,
  });
};
