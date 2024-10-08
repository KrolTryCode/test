import { UseQueryResult, keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { Role } from '~/api/utils/api-requests';
import { ALL_KEY, ROLES_KEY } from '~/api/utils/query-keys';

export const useGetAllRolesQuery = <T = Role[]>(
  options?: UseCustomQueryOptions<Role[], AxiosError, T>,
): UseQueryResult<T, AxiosError> =>
  useQuery({
    queryKey: [ROLES_KEY, ALL_KEY],
    queryFn: async () => await ApiClientSecured.rolesV1Controller.getAllRoles(),
    placeholderData: keepPreviousData,
    ...options,
  });
