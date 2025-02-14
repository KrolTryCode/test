import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ParameterForm } from '~/api/utils/api-requests';

import { formsQueries } from './queries';

export const getFormsQueryOptions = <T = ParameterForm[]>(
  projectId: string,
  options?: UseCustomQueryOptions<ParameterForm[], unknown, T>,
) =>
  queryOptions({
    ...formsQueries.list(projectId),
    ...options,
  });
