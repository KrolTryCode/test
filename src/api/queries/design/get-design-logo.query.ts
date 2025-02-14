import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { designQueries } from '~/api/queries/design/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { File } from '~/api/utils/api-requests';

export const getDesignLogoQueryOptions = <T = File>(
  logo: 'mainLogo' | 'loginLogo',
  options?: UseCustomQueryOptions<File, unknown, T>,
) =>
  queryOptions({
    ...designQueries.logo(logo),
    placeholderData: keepPreviousData,
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
