import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { designQueries } from '~/api/queries/design/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ColorPallet } from '~/api/utils/api-requests';

export const getColorPalettesQueryOptions = <T = ColorPallet[]>(
  options?: UseCustomQueryOptions<ColorPallet[], unknown, T>,
) =>
  queryOptions({
    ...designQueries.palettes,
    placeholderData: keepPreviousData,
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
