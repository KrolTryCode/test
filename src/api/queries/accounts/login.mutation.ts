import { useMutation } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClient } from '~/api/utils/api-client';
import { LoginRequest, LoginResponseWithRefreshToken } from '~/api/utils/api-requests';

export const useLoginMutation = (
  options?: UseCustomMutationOptions<LoginResponseWithRefreshToken, Error, LoginRequest>,
) => {
  return useMutation<LoginResponseWithRefreshToken, Error, LoginRequest>({
    mutationFn: async data => await ApiClient.authController.loginWithRefreshToken(data),
    ...options,
  });
};
