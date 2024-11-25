import { useMutation } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { UpdatePasswordRequest } from '~/api/utils/api-requests';

export const useChangePasswordAdminMutation = (
  userId: string,
  options?: UseCustomMutationOptions<object, unknown, UpdatePasswordRequest>,
) => {
  return useMutation<object, unknown, UpdatePasswordRequest>({
    mutationFn: passwordData =>
      ApiClientSecured.accountV1Controller.changePasswordByAdmin(userId, passwordData),
    gcTime: 0,
    ...options,
  });
};
