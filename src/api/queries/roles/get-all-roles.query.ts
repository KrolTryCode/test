import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { Role } from '~/api/utils/api-requests';

import { roleQueries } from './queries';

export const getAllRolesQueryOptions = <T = Role[]>(
  options?: UseCustomQueryOptions<Role[], AxiosError, T>,
) =>
  queryOptions({
    ...roleQueries.getAllRoles,
    placeholderData: keepPreviousData,
    ...options,
  });
