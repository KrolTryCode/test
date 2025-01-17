import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { LinksConfiguration } from '~/api/utils/api-requests';

import { settingsQueries } from './queries';

export const useGetExternalLinksQuery = <T = LinksConfiguration>(
  options?: UseCustomQueryOptions<LinksConfiguration, unknown, T>,
): UseQueryResult<T, unknown> =>
  useQuery({
    ...settingsQueries.linksConfiguration(),
    ...options,
  });
