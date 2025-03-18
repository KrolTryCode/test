import { queryOptions } from '@tanstack/react-query';

import { formCheckQueries } from '~/api/queries/forms/checks/queries';
import { UseCustomQueryOptions } from '~/api/typings/react-query-helpers';
import { ParameterFieldCheck } from '~/api/utils/api-requests';

export const getFormChecksQueryOptions = (
  formId: string,
  fieldId: string,
  options?: UseCustomQueryOptions<ParameterFieldCheck[], unknown>,
) => queryOptions({ ...formCheckQueries.list(formId, fieldId), ...options });
