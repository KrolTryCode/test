import { useMutation, useQueryClient } from '@tanstack/react-query';

import { User, UserData } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useSelfCreateUserMutation = (
  options?: UseCustomMutationOptions<User, unknown, UserData>,
) => {
  const queryClient = useQueryClient();

  return useMutation<User, unknown, UserData>({
    mutationKey: ['users', 'create-self'],
    mutationFn: async userData =>
      await ApiClientSecured.userRegistrationV1Controller.create(userData),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['users'] });
      options?.onSuccess?.(...args);
    },
  });
};

export const useCreateUserMutation = (
  options?: UseCustomMutationOptions<User, unknown, UserData>,
) => {
  const queryClient = useQueryClient();

  return useMutation<User, unknown, UserData>({
    mutationKey: ['users', 'create'],
    mutationFn: async userData => await ApiClientSecured.usersV1Controller.create1(userData),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['users'] });
      options?.onSuccess?.(...args);
    },
  });
};
