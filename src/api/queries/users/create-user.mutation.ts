import { useMutation, useQueryClient } from '@tanstack/react-query';

import { User, UserData } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { userQueries } from './queries';

export const useSelfCreateUserMutation = (
  options?: UseCustomMutationOptions<User, unknown, UserData>,
) => {
  const queryClient = useQueryClient();

  return useMutation<User, unknown, UserData>({
    mutationFn: userData => ApiClientSecured.userRegistrationV1Controller.selfCreateUser(userData),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: userQueries.list._def });
      options?.onSuccess?.(...args);
    },
  });
};

export const useCreateUserMutation = (
  options?: UseCustomMutationOptions<User, unknown, UserData>,
) => {
  const queryClient = useQueryClient();

  return useMutation<User, unknown, UserData>({
    mutationFn: userData => ApiClientSecured.usersV1Controller.createUser(userData),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: userQueries.list._def });
      options?.onSuccess?.(...args);
    },
  });
};
