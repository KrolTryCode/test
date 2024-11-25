import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userQueries } from '~/api/queries/users/queries';
import { Account } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useSetUserAsAdminMutation = (
  options?: UseCustomMutationOptions<Account, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Account, Error, string>({
    mutationFn: userId => ApiClientSecured.accountV1Controller.setAdmin(userId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: userQueries._def });
      options?.onSuccess?.(...args);
    },
  });
};
