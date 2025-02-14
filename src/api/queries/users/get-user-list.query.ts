import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { PageUser } from '~/api/utils/api-requests';
import { ServerPagingParams } from '~/utils/hooks';

import { UseCustomQueryOptions } from '../../typings/react-query-helpers';

import { userQueries } from './queries';

export const getUserListQueryOptions = <T = PageUser>(
  pagingParams: ServerPagingParams,
  options?: UseCustomQueryOptions<PageUser, unknown, T>,
) =>
  queryOptions({
    ...userQueries.list(pagingParams),
    placeholderData: keepPreviousData,
    ...options,
  });
