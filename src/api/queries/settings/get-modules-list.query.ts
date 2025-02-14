import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { CollectionModelEntityModelModuleConfiguration } from '~/api/utils/api-requests';

import { settingsQueries } from './queries';

export const getModulesListQueryOptions = <T = CollectionModelEntityModelModuleConfiguration>(
  options?: UseCustomQueryOptions<CollectionModelEntityModelModuleConfiguration, unknown, T>,
) =>
  queryOptions({
    ...settingsQueries.moduleList,
    ...options,
  });

export enum ModuleType {
  USERS = 'users',
  ACCOUNTS = 'accounts',
  DESIGN = 'design',
}
