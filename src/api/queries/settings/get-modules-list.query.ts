import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { CollectionModelEntityModelModuleConfiguration } from '~/api/utils/api-requests';

import { settingsQueries } from './queries';

export const useGetModulesListQuery = (
  options?: UseCustomQueryOptions<CollectionModelEntityModelModuleConfiguration>,
): UseQueryResult<CollectionModelEntityModelModuleConfiguration> => {
  return useQuery({
    ...settingsQueries.moduleList,
    ...options,
  });
};
