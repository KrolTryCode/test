import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Role } from '~/api/utils/api-requests';
import { ROLES_KEY } from '~/api/utils/query-keys';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

interface AddRolePermissions {
  roleId: string;
  id: string[];
}

export const useAddRolePermissionsMutation = (
  options?: UseCustomMutationOptions<Role, Error, AddRolePermissions>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Role, Error, AddRolePermissions>({
    mutationFn: async ({ id, roleId }: AddRolePermissions) =>
      await ApiClientSecured.rolesV1Controller.addRolePermissions(roleId, { id }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [ROLES_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
