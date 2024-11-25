import { useMutation } from '@tanstack/react-query';

import { UpdatePasswordRequest } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useChangePasswordMutation = (
  options?: UseCustomMutationOptions<object, unknown, UpdatePasswordRequest>,
) => {
  return useMutation<object, unknown, UpdatePasswordRequest>({
    mutationFn: passwordData => ApiClientSecured.accountV1Controller.changePassword(passwordData),
    gcTime: 0,
    ...options,
  });
};
