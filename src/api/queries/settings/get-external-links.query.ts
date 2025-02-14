import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { LinksConfiguration } from '~/api/utils/api-requests';

import { settingsQueries } from './queries';

export const getExternalLinksQueryOptions = <T = LinksConfiguration>(
  options?: UseCustomQueryOptions<LinksConfiguration, unknown, T>,
) =>
  queryOptions({
    ...settingsQueries.linksConfiguration(),
    ...options,
  });
