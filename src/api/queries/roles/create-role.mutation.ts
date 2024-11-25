import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateRole, Role } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { roleQueries } from './queries';

export const useCreateRoleMutation = (
  options?: UseCustomMutationOptions<Role, Error, CreateRole>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Role, Error, CreateRole>({
    mutationFn: role => ApiClientSecured.rolesV1Controller.createRole(role),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: roleQueries.getAllRoles._def });
      options?.onSuccess?.(...args);
    },
  });
};
