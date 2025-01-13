import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { TaskFormData } from '~/api/mocks/forms/types';
import { formQueries } from '~/api/tasks/forms/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';

export const useGetFormQuery = <T = TaskFormData>(
  formId: string,
  options?: UseCustomQueryOptions<TaskFormData, unknown, T>,
): UseQueryResult<T, unknown> => {
  return useQuery({
    ...formQueries.single(formId),
    ...options,
  });
};
