import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ApiClientSecured } from '~/api/utils/api-client';
import { CollectionModelEntityModelModuleConfiguration } from '~/api/utils/api-requests';
import { ALL_KEY, MODULE_CONFIGURATION_KEY } from '~/api/utils/query-keys';

export const useGetModulesListQuery = (
  options?: UseCustomQueryOptions<CollectionModelEntityModelModuleConfiguration>,
): UseQueryResult<CollectionModelEntityModelModuleConfiguration> => {
  return useQuery({
    queryKey: [MODULE_CONFIGURATION_KEY, ALL_KEY],
    queryFn: async () => await ApiClientSecured.moduleConfigurationController.getModules(),
    ...options,
  });
};
