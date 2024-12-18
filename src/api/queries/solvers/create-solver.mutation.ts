import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SOLVER_MOCK_SERVER_URLS } from '~/api/mocks/solvers/controller';
import { Solver, SolverFormInput } from '~/api/mocks/solvers/types';
import { solverQueries } from '~/api/queries/solvers/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentType } from '~/api/utils/api-requests';

export const useCreateSolverMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<Solver, Error, SolverFormInput>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    //TODO: add API call
    mutationFn: data =>
      ApiClientSecured.request({
        path: SOLVER_MOCK_SERVER_URLS.CREATE,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
      }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: solverQueries.list._def });
      options?.onSuccess?.(...args);
    },
  });
};
