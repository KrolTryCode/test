import { queryOptions } from '@tanstack/react-query';

import { solverQueries } from '~/api/queries/solvers/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { Solver } from '~/api/utils/api-requests';

export const getSolversQueryOptions = <T = Solver[]>(
  projectId: string,
  options?: UseCustomQueryOptions<Solver[], unknown, T>,
) =>
  queryOptions({
    ...solverQueries.list(projectId),
    ...options,
  });
