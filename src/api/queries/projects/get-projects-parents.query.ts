import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ProjectNode } from '~/api/utils/api-requests';

import { projectQueries } from './queries';

export const getParentsQueryOptions = <T = ProjectNode[]>(
  projectId: string,
  options?: UseCustomQueryOptions<ProjectNode[], unknown, T>,
) =>
  queryOptions({
    ...projectQueries.parents(projectId),
    ...options,
  });
