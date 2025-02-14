import { queryOptions } from '@tanstack/react-query';

import { FullProjectNodeMemberInfo } from '~/api/utils/api-requests';

import { UseCustomQueryOptions } from '../../typings/react-query-helpers';

import { projectMemberQueries } from './queries';

export const getProjectMembersQueryOptions = (
  projectId: string,
  options?: UseCustomQueryOptions<FullProjectNodeMemberInfo[]>,
) =>
  queryOptions({
    ...projectMemberQueries.list(projectId),
    enabled: projectId !== '',
    ...options,
  });
