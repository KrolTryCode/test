import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { Role } from '~/api/utils/api-requests';

import { roleQueries } from './queries';

export const useGetAllRolesQuery = <T = Role[]>(
  options?: UseCustomQueryOptions<Role[], AxiosError, T>,
): UseQueryResult<T, AxiosError> =>
  useQuery({
    ...roleQueries.getAllRoles,
    placeholderData: keepPreviousData,
    ...options,
  });
