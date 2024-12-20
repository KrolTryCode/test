import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query';

import { designQueries } from '~/api/queries/design/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { File } from '~/api/utils/api-requests';

export const useGetDesignLogoQuery = <T = File>(
  logo: 'mainLogo' | 'loginLogo',
  options?: UseCustomQueryOptions<File, unknown, T>,
): UseQueryResult<T, unknown> =>
  useQuery({
    ...designQueries.logo(logo),
    placeholderData: keepPreviousData,
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
