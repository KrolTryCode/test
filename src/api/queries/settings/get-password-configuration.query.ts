import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { AccountConfiguration } from '~/api/utils/api-requests';

export const useGetPasswordConfigurationQuery = (
  options?: UseCustomQueryOptions<AccountConfiguration>,
): UseQueryResult<AccountConfiguration> => {
  return useQuery({
    queryKey: ['configuration', 'all'],
    queryFn: async () =>
      await ApiClientSecured.accountConfigurationV1Controller.getAccountConfiguration(),
    ...options,
  });
};
