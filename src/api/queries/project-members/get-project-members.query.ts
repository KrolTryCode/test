import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { FullProjectNodeMemberInfo } from '~/api/utils/api-requests';

import { UseCustomQueryOptions } from '../../typings/react-query-helpers';

import { projectMemberQueries } from './queries';

export const useGetProjectMembersQuery = (
  projectId: string,
  options?: UseCustomQueryOptions<FullProjectNodeMemberInfo[]>,
): UseQueryResult<FullProjectNodeMemberInfo[], unknown> => {
  return useQuery({
    ...projectMemberQueries.list(projectId),
    enabled: projectId !== '',
    ...options,
  });
};
