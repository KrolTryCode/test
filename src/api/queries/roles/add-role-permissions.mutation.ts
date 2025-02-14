import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Role } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { roleQueries } from './queries';

interface AddRolePermissions {
  roleId: string;
  id: string[];
}

export const useAddRolePermissionsMutation = (
  options?: UseCustomMutationOptions<Role, Error, AddRolePermissions>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Role, Error, AddRolePermissions>({
    mutationFn: ({ id, roleId }) =>
      ApiClientSecured.rolesV1Controller.addRolePermissions(roleId, { id }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: roleQueries.getAllRoles.queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
