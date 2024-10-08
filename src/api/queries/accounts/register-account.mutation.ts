import { useMutation } from '@tanstack/react-query';

import { RegisterRequest } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClient } from '../../utils/api-client';

export const useRegisterAccountMutation = (
  options?: UseCustomMutationOptions<object, Error, RegisterRequest>,
) => {
  return useMutation<object, Error, RegisterRequest>({
    mutationFn: async data => await ApiClient.authController.register(data),
    ...options,
  });
};
