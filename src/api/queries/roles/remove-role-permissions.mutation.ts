import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Role } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { roleQueries } from './queries';

interface RemoveRolePermissions {
  roleId: string;
  id: string[];
}

export const useRemoveRolePermissionsMutation = (
  options?: UseCustomMutationOptions<Role, Error, RemoveRolePermissions>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Role, Error, RemoveRolePermissions>({
    mutationFn: ({ roleId, id }) =>
      ApiClientSecured.rolesV1Controller.removeRolePermissions(roleId, { id }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: roleQueries.getAllRoles._def });
      options?.onSuccess?.(...args);
    },
  });
};
