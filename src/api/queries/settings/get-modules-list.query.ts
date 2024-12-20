import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { CollectionModelEntityModelModuleConfiguration } from '~/api/utils/api-requests';

import { settingsQueries } from './queries';

export const useGetModulesListQuery = <T = CollectionModelEntityModelModuleConfiguration>(
  options?: UseCustomQueryOptions<CollectionModelEntityModelModuleConfiguration, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...settingsQueries.moduleList,
    ...options,
  });
};

export enum ModuleType {
  USERS = 'users',
  ACCOUNTS = 'accounts',
  DESIGN = 'design',
}
