import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Account } from '~/api/utils/api-requests';
import { USERS_KEY } from '~/api/utils/query-keys';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useRemoveUserFromAdminsMutation = (
  options?: UseCustomMutationOptions<Account, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Account, Error, string>({
    mutationFn: async userId => await ApiClientSecured.accountV1Controller.removeAdmin(userId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
