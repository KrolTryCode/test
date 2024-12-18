import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SOLVER_MOCK_SERVER_URLS } from '~/api/mocks/solvers/controller';
import { solverQueries } from '~/api/queries/solvers/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentType } from '~/api/utils/api-requests';

export const useDeleteSolverMutation = (
  projectId: string,
  options?: UseCustomMutationOptions<void, unknown, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    //TODO: add API call
    mutationFn: id =>
      ApiClientSecured.request({
        path: SOLVER_MOCK_SERVER_URLS.DELETE + '/' + id,
        method: 'DELETE',
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
