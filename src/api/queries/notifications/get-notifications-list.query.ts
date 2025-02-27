import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { PageNotification } from '~/api/utils/api-requests';
import { ServerPagingParams } from '~/utils/hooks/use-server-options';

import { notificationsQueries } from './queries';

export const getNotificationsListOptions = <T = PageNotification>(
  pagingParams: ServerPagingParams,
  options?: UseCustomQueryOptions<PageNotification, unknown, T>,
) =>
  queryOptions({
    ...notificationsQueries.list(pagingParams),
    placeholderData: keepPreviousData,
    ...options,
  });
