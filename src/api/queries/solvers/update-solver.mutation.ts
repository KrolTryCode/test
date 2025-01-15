import { useMutation, useQueryClient } from '@tanstack/react-query';

import { solverQueries } from '~/api/queries/solvers/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Solver, SolverRequest } from '~/api/utils/api-requests';

interface MutationFnVariables extends SolverRequest {
  solverId: string;
}

export const useUpdateSolverMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<Solver, Error, MutationFnVariables>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ solverId, ...data }) =>
      ApiClientSecured.projectSolversV1Controller.updateProjectSolver(solverId, projectId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: solverQueries.list._def });
      options?.onSuccess?.(...args);
    },
  });
};
