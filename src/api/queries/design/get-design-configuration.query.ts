import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { designQueries } from '~/api/queries/design/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { DesignConfiguration } from '~/api/utils/api-requests';

export const getDesignConfigurationQueryOptions = <T = DesignConfiguration>(
  options?: UseCustomQueryOptions<DesignConfiguration, unknown, T>,
) =>
  queryOptions({
    ...designQueries.designConfiguration(),
    placeholderData: keepPreviousData,
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
