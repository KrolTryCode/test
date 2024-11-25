import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

import { userQueries } from './queries';

export const useArchiveUserMutation = (
  options?: UseCustomMutationOptions<object, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<object, Error, string>({
    mutationFn: userId => ApiClientSecured.usersV1Controller.archiveUser(userId),
    ...options,
    onSuccess(data, userId, ctx) {
      void queryClient.invalidateQueries({ queryKey: userQueries.list._def });
      void queryClient.invalidateQueries({ queryKey: userQueries.single(userId).queryKey });
      options?.onSuccess?.(data, userId, ctx);
    },
  });
};
