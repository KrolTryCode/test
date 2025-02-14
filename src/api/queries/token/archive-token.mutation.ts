import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ServiceToken } from '~/api/utils/api-requests';

import { tokenQueries } from './queries';

export const useArchiveTokenMutation = (
  nodeId: string,
  options?: UseCustomMutationOptions<ServiceToken, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ServiceToken, Error, string>({
    mutationFn: (tokenId: string) =>
      ApiClientSecured.projectNodeTokenV1Controller.archiveServiceToken(nodeId, tokenId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: tokenQueries.list(nodeId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
