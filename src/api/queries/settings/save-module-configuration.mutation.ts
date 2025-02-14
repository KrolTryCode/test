import { useMutation, useQueryClient } from '@tanstack/react-query';

import { designQueries } from '~/api/queries/design/queries';
import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { ContentType } from '~/api/utils/api-requests';

import { settingsQueries, Configuration } from './queries';

export const useSaveConfigurationMutation = (
  name: string,
  path: string,
  options?: UseCustomMutationOptions<Configuration, unknown, Configuration>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Configuration) =>
      ApiClientSecured.request<Configuration>({
        secure: true,
        type: ContentType.Json,
        method: 'POST',
        path,
        body: JSON.stringify(values),
      }),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: designQueries.logo._def });
      void queryClient.invalidateQueries({ queryKey: designQueries.configuration.queryKey });
      void queryClient.invalidateQueries({
        queryKey: settingsQueries.moduleConfiguration(name, path).queryKey,
      });
      options?.onSuccess?.(...args);
    },
  });
};
