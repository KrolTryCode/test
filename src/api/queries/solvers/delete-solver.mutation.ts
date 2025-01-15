import { useMutation, useQueryClient } from '@tanstack/react-query';

import { solverQueries } from '~/api/queries/solvers/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Solver } from '~/api/utils/api-requests';

export const useDeleteSolverMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<Solver, unknown, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: solverId =>
      ApiClientSecured.projectSolversV1Controller.deleteProjectSolver(solverId, projectId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: solverQueries.list._def });
      options?.onSuccess?.(...args);
    },
  });
};
