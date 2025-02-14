import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { AccountConfiguration } from '~/api/utils/api-requests';

import { settingsQueries } from './queries';

export const getPasswordConfigurationQueryOptions = (
  options?: UseCustomQueryOptions<AccountConfiguration>,
) =>
  queryOptions({
    ...settingsQueries.passwordConfiguration,
    ...options,
  });
