import { useMutation } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';

export const useGetImageMutation = (
  options?: UseCustomMutationOptions<string, unknown, string>,
) => {
  return useMutation<string, unknown, string>({
    mutationFn: async imageId => {
      // TODO: вернуть после обновления API
      //@ts-expect-error need api fix
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return (await ApiClientSecured.filesV1Controller.getImage(imageId)) as string;
    },
    ...options,
  });
};
