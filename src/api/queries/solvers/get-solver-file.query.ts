import { queryOptions } from '@tanstack/react-query';

import { solverQueries } from '~/api/queries/solvers/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { SolverFile } from '~/api/utils/api-requests';

export const getSolverFileQueryOptions = <T = SolverFile>(
  solverId: string,
  options?: UseCustomQueryOptions<SolverFile, unknown, T>,
) =>
  queryOptions({
    ...solverQueries.file(solverId),
    ...options,
  });
