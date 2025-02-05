import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

import { Configuration, settingsQueries } from './queries';

export const useGetConfigurationQuery = (
  name: string,
  path: string,
  options?: UseCustomQueryOptions<Configuration>,
): UseQueryResult<Configuration> => {
  return useQuery({
    ...settingsQueries.moduleConfiguration(name, path),
    ...options,
  });
};
