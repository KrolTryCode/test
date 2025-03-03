import { queryOptions } from '@tanstack/react-query';

import { projectQueries } from '~/api/queries/projects/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { FullTaskInfo } from '~/api/utils/api-requests';

interface RealFullTaskInfo extends FullTaskInfo {
  parameters: {
    params: {
      [name: string]: string | null;
      solver: string | null;
      contents: string | null;
      timeout: string | null;
    };
  };
}

export const getProjectTaskQueryOptions = <T = RealFullTaskInfo>(
  taskId: string,
  options?: UseCustomQueryOptions<FullTaskInfo, unknown, T>,
) =>
  queryOptions({
    ...projectQueries.task(taskId),
    ...options,
  });
