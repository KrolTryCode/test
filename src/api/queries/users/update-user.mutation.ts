import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userQueries } from '~/api/queries/users/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { UpdateUserRequest, User } from '~/api/utils/api-requests';

export const useUpdateUserMutation = (
  userId: string,
  options?: UseCustomMutationOptions<User, unknown, UpdateUserRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation<User, unknown, UpdateUserRequest>({
    mutationFn: userData => ApiClientSecured.usersV1Controller.updateUser(userId, userData),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: userQueries.list._def });
      void queryClient.invalidateQueries({ queryKey: userQueries.single(userId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
