import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { USERS_KEY } from '~/api/utils/query-keys';

export const useArchiveUserMutation = (
  options?: UseCustomMutationOptions<object, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<object, Error, string>({
    mutationFn: async userId => await ApiClientSecured.usersV1Controller.archiveUser(userId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
      options?.onSuccess?.(...args);
    },
  });
};
