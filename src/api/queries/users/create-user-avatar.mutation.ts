import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserFile } from '~/api/utils/api-requests';

import { UseCustomMutationOptions } from '../../typings/react-query-helpers';
import { ApiClientSecured } from '../../utils/api-client';

import { userQueries } from './queries';

interface Data {
  /** @format binary */
  file: File;
}

export const useCreateAvatarMutation = (
  userId: string,
  options?: UseCustomMutationOptions<UserFile, unknown, Data>,
) => {
  const queryClient = useQueryClient();

  return useMutation<UserFile, unknown, Data>({
    mutationFn: async data => ApiClientSecured.userFilesV1Controller.saveAvatar(data),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: userQueries.avatarId(userId).queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
