import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { FullProjectMemberInfo } from '~/api/utils/api-requests';
import { PROJECT_MEMBERS_KEY } from '~/api/utils/query-keys';

import { UseCustomQueryOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useGetProjectMembersQuery = (
  projectId: string,
  options?: UseCustomQueryOptions<FullProjectMemberInfo[]>,
): UseQueryResult<FullProjectMemberInfo[], unknown> => {
  return useQuery({
    queryKey: [PROJECT_MEMBERS_KEY, { projectId: projectId }],
    queryFn: async () => await ApiClientSecured.projectMembersV1Controller.getAllMembers(projectId),
    enabled: projectId !== '',
    ...options,
  });
};
