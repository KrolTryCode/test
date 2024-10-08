import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateRole, Role } from '~/api/utils/api-requests';
import { ROLES_KEY } from '~/api/utils/query-keys';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

export const useCreateRoleMutation = (
  options?: UseCustomMutationOptions<Role, Error, CreateRole>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Role, Error, CreateRole>({
    mutationFn: async (role: CreateRole) =>
      await ApiClientSecured.rolesV1Controller.createRole(role),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [ROLES_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
