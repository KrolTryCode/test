import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Role } from '~/api/utils/api-requests';

export const useGetAllRolesQuery = <T = Role[]>(
  options?: UseCustomQueryOptions<Role[], AxiosError, T>,
): UseQueryResult<T, AxiosError> =>
  useQuery({
    queryKey: ['roles', 'all'],
    queryFn: async () => await ApiClientSecured.rolesV1Controller.getAllRoles(),
    placeholderData: keepPreviousData,
    ...options,
  });
