import { useMutation } from '@tanstack/react-query';

import { ReactivateAccountRequest, RecoverPasswordRequest } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClient, ApiClientSecured } from '../../utils/api-client';

export const useStartAccountReactivationMutation = (
  options?: UseCustomMutationOptions<void, Error, string>,
) => {
  return useMutation<void, Error, string>({
    mutationFn: (userId: string) => ApiClientSecured.accountV1Controller.startReactivation(userId),
    ...options,
  });
};

export const useCompleteAccountReactivationMutation = (
  options?: UseCustomMutationOptions<void, Error, ReactivateAccountRequest>,
) =>
  useMutation<void, Error, RecoverPasswordRequest>({
    mutationFn: data => ApiClient.authController.reactivate(data),
    ...options,
  });
