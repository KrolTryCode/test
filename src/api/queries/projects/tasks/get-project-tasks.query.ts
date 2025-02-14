import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { FullTaskInfo } from '~/api/utils/api-requests';

import { projectQueries } from '../queries';

export const getProjectTasksQueryOptions = <T = FullTaskInfo[]>(
  projectId: string,
  options?: UseCustomQueryOptions<FullTaskInfo[], unknown, T>,
) =>
  queryOptions({
    ...projectQueries.tasks(projectId),
    ...options,
  });
