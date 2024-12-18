import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Solver } from '~/api/mocks/solvers/types';
import { solverQueries } from '~/api/queries/solvers/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

export const useGetSolversQuery = <T = Solver[]>(
  projectId: string,
  options?: UseCustomQueryOptions<Solver[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...solverQueries.list(projectId),
    ...options,
  });
};
