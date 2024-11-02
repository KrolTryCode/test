import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Account, UpdateAccountRequest } from '~/api/utils/api-requests';
import { USERS_KEY } from '~/api/utils/query-keys';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured, ErrorResponse } from '../../utils/api-client';

export type UpdateAccountMutationPayload = UpdateAccountRequest & { userId: string };

export const useUpdateAccountMutation = (
  options?: UseCustomMutationOptions<
    Account,
    AxiosError<ErrorResponse>,
    UpdateAccountMutationPayload
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation<Account, AxiosError<ErrorResponse>, UpdateAccountMutationPayload>({
    mutationFn: async ({ userId, ...data }) =>
      await ApiClientSecured.accountV1Controller.updateAccount(userId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
