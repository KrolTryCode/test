import { useMutation, useQueryClient } from '@tanstack/react-query';

import { File } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { userQueries } from './queries';

export const useDeleteUserAvatarMutation = (
  userId: string,
  options?: UseCustomMutationOptions<File, unknown, void>,
) => {
  const queryClient = useQueryClient();

  return useMutation<File, unknown, void>({
    mutationFn: async () => ApiClientSecured.userFilesV1Controller.deleteAvatar(userId),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: userQueries.avatarId(userId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
