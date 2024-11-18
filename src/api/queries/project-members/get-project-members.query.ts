import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { FullProjectNodeMemberInfo } from '~/api/utils/api-requests';
import { PROJECT_MEMBERS_KEY } from '~/api/utils/query-keys';

import { UseCustomQueryOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useGetProjectMembersQuery = (
  projectId: string,
  options?: UseCustomQueryOptions<FullProjectNodeMemberInfo[]>,
): UseQueryResult<FullProjectNodeMemberInfo[], unknown> => {
  return useQuery({
    queryKey: [PROJECT_MEMBERS_KEY, projectId],
    queryFn: async () =>
      await ApiClientSecured.projectNodeMemberV1Controller.getAllMembers(projectId),
    enabled: projectId !== '',
    ...options,
  });
};
