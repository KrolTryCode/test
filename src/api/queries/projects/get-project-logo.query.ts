import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

import { projectQueries } from './queries';

export const getProjectLogoQueryOptions = <T = string>(
  projectId: string,
  options?: UseCustomQueryOptions<string, unknown, T>,
) =>
  queryOptions({
    ...projectQueries.logo(projectId),
    ...options,
  });
