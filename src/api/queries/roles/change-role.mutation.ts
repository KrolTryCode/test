import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateRole, Role } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export interface UpdateRole extends CreateRole {
  id: string;
}

export const useChangeRoleMutation = (
  options?: UseCustomMutationOptions<Role, Error, UpdateRole>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Role, Error, UpdateRole>({
    mutationKey: ['roles', 'change'],
    mutationFn: async (role: UpdateRole) =>
      await ApiClientSecured.rolesV1Controller.changeRole(role.id, role),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: ['roles'] });
      options?.onSuccess?.(...args);
    },
  });
};
