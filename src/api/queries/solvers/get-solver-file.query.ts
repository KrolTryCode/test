import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { solverQueries } from '~/api/queries/solvers/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { SolverFile } from '~/api/utils/api-requests';

export const useGetSolverFileQuery = <T = SolverFile>(
  solverId: string,
  options?: UseCustomQueryOptions<SolverFile, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...solverQueries.file(solverId),
    ...options,
  });
};
