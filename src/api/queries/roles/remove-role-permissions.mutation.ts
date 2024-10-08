import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Role } from '~/api/utils/api-requests';
import { ROLES_KEY } from '~/api/utils/query-keys';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

interface RemoveRolePermissions {
  roleId: string;
  id: string[];
}

export const useRemoveRolePermissionsMutation = (
  options?: UseCustomMutationOptions<Role, Error, RemoveRolePermissions>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Role, Error, RemoveRolePermissions>({
    mutationFn: async ({ roleId, id }: RemoveRolePermissions) =>
      await ApiClientSecured.rolesV1Controller.removeRolePermissions(roleId, { id }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [ROLES_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
