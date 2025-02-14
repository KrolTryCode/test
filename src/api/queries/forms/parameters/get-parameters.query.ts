import { queryOptions } from '@tanstack/react-query';

import { formParametersQueries } from '~/api/queries/forms/parameters/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ParameterField } from '~/api/utils/api-requests';

export const getFormParametersQueryOptions = <T = ParameterField[]>(
  formId: string,
  options?: UseCustomQueryOptions<ParameterField[], unknown, T>,
) =>
  queryOptions({
    ...formParametersQueries.list(formId),
    ...options,
  });
