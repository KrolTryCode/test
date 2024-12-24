import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { tokenQueries } from '~/api/queries/token/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ErrorResponse } from '~/api/utils/api-client';
import { ServiceToken } from '~/api/utils/api-requests';

export const useGetNodeTokensQuery = <T = ServiceToken[]>(
  nodeId: string,
  options?: UseCustomQueryOptions<ServiceToken[], AxiosError<ErrorResponse>, T>,
): UseQueryResult<T, AxiosError<ErrorResponse>> => {
  return useQuery({
    ...tokenQueries.tokensList(nodeId),
    placeholderData: keepPreviousData,
    ...options,
  });
};
