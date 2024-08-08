import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentType } from '~/api/utils/api-requests';
import { Configuration } from '~/components/configuration-form/configuration-form.type';

export const useSaveConfigurationMutation = (
  name: string,
  path: string,
  options?: UseCustomMutationOptions<Configuration, unknown, Configuration>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['configuration', 'all'],
    mutationFn: async (values: Configuration) =>
      await ApiClientSecured.request<Configuration>({
        secure: true,
        type: ContentType.Json,
        method: 'POST',
        path,
        body: JSON.stringify(values),
      }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({
        queryKey: ['configuration', name, 'all'],
      });
      options?.onSuccess?.(...args);
    },
  });
};
