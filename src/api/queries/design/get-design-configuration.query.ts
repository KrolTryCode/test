import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query';

import { designQueries } from '~/api/queries/design/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { DesignConfiguration } from '~/api/utils/api-requests';

export const useGetDesignConfigurationQuery = <T = DesignConfiguration>(
  options?: UseCustomQueryOptions<DesignConfiguration, unknown, T>,
): UseQueryResult<T, unknown> =>
  useQuery({
    ...designQueries.designConfiguration(),
    placeholderData: keepPreviousData,
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
