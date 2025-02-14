import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Role } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { roleQueries } from './queries';

export const useRemoveRoleMutation = (options?: UseCustomMutationOptions<Role, Error, string>) => {
  const queryClient = useQueryClient();

  return useMutation<Role, Error, string>({
    mutationFn: (id: string) => ApiClientSecured.rolesV1Controller.removeRole(id),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: roleQueries.getAllRoles.queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
