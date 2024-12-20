import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';

import { designQueries } from '~/api/queries/design/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ColorPallet } from '~/api/utils/api-requests';

export const useGetColorPalettesQuery = <T = ColorPallet[]>(
  options?: UseCustomQueryOptions<ColorPallet[], unknown, T>,
): UseQueryResult<T, unknown> =>
  useQuery({
    ...designQueries.palettes(),
    placeholderData: keepPreviousData,
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
