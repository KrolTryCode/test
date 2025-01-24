import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ServiceTokenRequest } from '~/api/utils/api-requests';
import { ICreateTokenForm } from '~/pages/_main/projects/project.$projectId/settings/token/generate-token.schema';

import { tokenQueries } from './queries';

export const useGenerateTokenMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<string, Error, ICreateTokenForm>,
) => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, ICreateTokenForm>({
    mutationFn: (data: ICreateTokenForm) =>
      ApiClientSecured.projectNodeTokenV1Controller.generateServiceToken(
        nodeId,
        data as unknown as ServiceTokenRequest,
      ),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tokenQueries.tokensList(nodeId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
