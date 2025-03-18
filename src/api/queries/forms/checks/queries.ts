import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const formCheckQueries = createQueryKeys('form-checks', {
  list: (formId: string, fieldId: string) => ({
    queryKey: [formId, fieldId],
    queryFn: () =>
      ApiClientSecured.parameterFieldCheckV1Controller.getFormParameterFieldChecks(formId, fieldId),
  }),
});
