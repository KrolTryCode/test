import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Configuration } from '~/components/configuration-form/configuration-form.type';

export const useGetConfigurationQuery = (
  name: string,
  path: string,
  options?: UseCustomQueryOptions<Configuration>,
): UseQueryResult<Configuration> => {
  return useQuery({
    queryKey: ['configuration', name, 'all'],
    queryFn: async () =>
      await ApiClientSecured.request<Configuration>({
        secure: true,
        method: 'GET',
        path,
      }),
    ...options,
  });
};
