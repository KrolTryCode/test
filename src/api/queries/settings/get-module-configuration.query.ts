import { queryOptions } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

import { Configuration, settingsQueries } from './queries';

export const getConfigurationQueryOptions = (
  name: string,
  path: string,
  options?: UseCustomQueryOptions<Configuration>,
) =>
  queryOptions({
    ...settingsQueries.moduleConfiguration(name, path),
    ...options,
  });
