import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { formParametersQueries } from '~/api/queries/forms/parameters/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ParameterField } from '~/api/utils/api-requests';

export const useGetFormParametersQuery = <T = ParameterField[]>(
  formId: string,
  options?: UseCustomQueryOptions<ParameterField[], unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...formParametersQueries.list(formId),
    ...options,
  });
};
