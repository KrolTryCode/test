import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { CollectionModelEntityModelModuleConfiguration } from '~/api/utils/api-requests';

export const useGetModulesListQuery = (
  options?: UseCustomQueryOptions<CollectionModelEntityModelModuleConfiguration>,
): UseQueryResult<CollectionModelEntityModelModuleConfiguration> => {
  return useQuery({
    queryKey: ['configuration', 'all'],
    queryFn: async () => await ApiClientSecured.moduleConfigurationController.getModules(),
    ...options,
  });
};
