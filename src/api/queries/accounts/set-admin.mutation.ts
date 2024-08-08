import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Account } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useSetUserAsAdminMutation = (
  options?: UseCustomMutationOptions<Account, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Account, Error, string>({
    mutationKey: ['users', 'set-admin'],
    mutationFn: async userId => await ApiClientSecured.accountV1Controller.setAdmin(userId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['users'] });
      options?.onSuccess?.(...args);
    },
  });
};
