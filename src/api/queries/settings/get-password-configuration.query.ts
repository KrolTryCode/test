import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { AccountConfiguration } from '~/api/utils/api-requests';

import { settingsQueries } from './queries';

export const useGetPasswordConfigurationQuery = (
  options?: UseCustomQueryOptions<AccountConfiguration>,
): UseQueryResult<AccountConfiguration> => {
  return useQuery({
    ...settingsQueries.passwordConfiguration,
    ...options,
  });
};
