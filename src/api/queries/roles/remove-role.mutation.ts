import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Role } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useRemoveRoleMutation = (options?: UseCustomMutationOptions<Role, Error, string>) => {
  const queryClient = useQueryClient();

  return useMutation<Role, Error, string>({
    mutationKey: ['roles', 'remove'],
    mutationFn: async (id: string) => await ApiClientSecured.rolesV1Controller.removeRole(id),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['roles'] });
      options?.onSuccess?.(...args);
    },
  });
};
