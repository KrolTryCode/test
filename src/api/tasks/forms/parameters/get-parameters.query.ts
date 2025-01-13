import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { FormParameter } from '~/api/mocks/forms/parameters/types';
import { formParametersQueries } from '~/api/tasks/forms/parameters/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

export const useGetFormParametersQuery = <T = FormParameter[]>(
  formId: string,
  options?: UseCustomQueryOptions<FormParameter[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...formParametersQueries.list(formId),
    ...options,
  });
};
