import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UseCustomMutationOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { LinksConfiguration } from '~/api/utils/api-requests';

import { settingsQueries } from './queries';

export const useUpdateLinksConfigurationMutation = (
  options?: UseCustomMutationOptions<LinksConfiguration, unknown, LinksConfiguration>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (config: LinksConfiguration) =>
      ApiClientSecured.linksConfigurationV1Controller.updateLinksConfiguration(config),
    ...options,
    onSuccess(...args) {
      void queryClient.invalidateQueries({ queryKey: settingsQueries.linksConfiguration.queryKey });
      options?.onSuccess?.(...args);
    },
  });
};
