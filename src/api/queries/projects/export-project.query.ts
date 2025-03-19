import { queryOptions } from '@tanstack/react-query';

import { projectQueries } from '~/api/queries/projects/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { File } from '~/api/utils/api-requests';

export const exportProjectQueryOptions = <T = File>(
  projectId: string,
  types: string[],
  options?: UseCustomQueryOptions<File, unknown, T>,
) =>
  queryOptions({
    ...projectQueries.exportProject(projectId, types),
    ...options,
  });
