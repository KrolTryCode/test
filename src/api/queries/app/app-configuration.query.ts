import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { AppConfig } from '~/api/utils/api-requests';

import { appQueries } from './queries';

export const useAppConfigurationQuery = <T = AppConfig>(
  options?: UseCustomQueryOptions<AppConfig, unknown, T>,
): UseQueryResult<T, unknown> =>
  useQuery({
    ...appQueries.configuration(),
    placeholderData: keepPreviousData,
    ...options,
  });
