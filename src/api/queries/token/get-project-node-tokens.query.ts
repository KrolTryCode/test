import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { tokenQueries } from '~/api/queries/token/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ErrorResponse } from '~/api/utils/api-client';
import { ServiceToken } from '~/api/utils/api-requests';

export const getNodeTokensQueryOptions = <T = ServiceToken[]>(
  nodeId: string,
  options?: UseCustomQueryOptions<ServiceToken[], AxiosError<ErrorResponse>, T>,
) =>
  queryOptions({
    ...tokenQueries.tokensList(nodeId),
    placeholderData: keepPreviousData,
    ...options,
  });
