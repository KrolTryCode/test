import { useMutation, useQueryClient } from '@tanstack/react-query';

import { solverQueries } from '~/api/queries/solvers/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { File, SolverFile } from '~/api/utils/api-requests';

export const useCreateSolverFile = (
  projectId: string,
  solverId: string,
  options?: UseCustomMutationOptions<SolverFile, Error, File>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: file =>
      ApiClientSecured.projectSolversV1Controller.createSolverFiles(projectId, solverId, { file }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: solverQueries.file(solverId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
