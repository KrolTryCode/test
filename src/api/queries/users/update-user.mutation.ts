import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { UpdateUserRequest, User } from '~/api/utils/api-requests';
import { USERS_KEY } from '~/api/utils/query-keys';

export const useUpdateUserMutation = (
  userId: string,
  options?: UseCustomMutationOptions<User, unknown, UpdateUserRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation<User, unknown, UpdateUserRequest>({
    mutationFn: async userData =>
      await ApiClientSecured.usersV1Controller.updateUser(userId, userData),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
