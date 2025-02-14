import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { AppConfig } from '~/api/utils/api-requests';

import { appQueries } from './queries';

export const appConfigurationQueryOptions = <T = AppConfig>(
  options?: UseCustomQueryOptions<AppConfig, unknown, T>,
) =>
  queryOptions({
    ...appQueries.configuration(),
    placeholderData: keepPreviousData,
    ...options,
  });
