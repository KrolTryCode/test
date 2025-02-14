import { queryOptions } from '@tanstack/react-query';

import { projectQueries } from '~/api/queries/projects/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { FullTaskInfo } from '~/api/utils/api-requests';

export const getProjectTaskQueryOptions = <T = FullTaskInfo>(
  taskId: string,
  options?: UseCustomQueryOptions<FullTaskInfo, unknown, T>,
) =>
  queryOptions({
    ...projectQueries.task(taskId),
    ...options,
  });
