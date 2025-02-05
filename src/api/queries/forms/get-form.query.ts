import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ParameterForm } from '~/api/utils/api-requests';

import { formsQueries } from './queries';

export const useGetFormQuery = <T = ParameterForm>(
  formId: string,
  options?: UseCustomQueryOptions<ParameterForm, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...formsQueries.single(formId),
    ...options,
  });
};
