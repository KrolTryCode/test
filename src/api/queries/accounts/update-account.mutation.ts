import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Account, UpdateAccountRequest } from '~/api/utils/api-requests';

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
    mutationKey: ['users', 'update'],
    mutationFn: async ({ userId, ...data }) =>
      await ApiClientSecured.accountV1Controller.update1(userId, data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['users'] });
      options?.onSuccess?.(...args);
    },
  });
};
