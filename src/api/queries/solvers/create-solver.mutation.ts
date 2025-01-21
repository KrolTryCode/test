import { useMutation, useQueryClient } from '@tanstack/react-query';

import { solverQueries } from '~/api/queries/solvers/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Solver, SolverRequest } from '~/api/utils/api-requests';

export const useCreateSolverMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<Solver, Error, SolverRequest>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: data =>
      ApiClientSecured.projectSolversV1Controller.createProjectSolver(projectId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: solverQueries.list._def });
      options?.onSuccess?.(...args);
    },
  });
};
