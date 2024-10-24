import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { AccountConfiguration } from '~/api/utils/api-requests';
import { MODULE_CONFIGURATION_KEY, PASSWORD_KEY } from '~/api/utils/query-keys';

export const useGetPasswordConfigurationQuery = (
  options?: UseCustomQueryOptions<AccountConfiguration>,
): UseQueryResult<AccountConfiguration> => {
  return useQuery({
    queryKey: [MODULE_CONFIGURATION_KEY, PASSWORD_KEY],
    queryFn: async () => await ApiClientSecured.applicationController.accountConfiguration(),
    ...options,
  });
};
