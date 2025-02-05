import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const formParametersQueries = createQueryKeys('parameters', {
  list: (formId: string) => ({
    queryKey: [formId, 'list'],
    queryFn: () => ApiClientSecured.parameterFieldV1Controller.getFormParameterFields(formId),
  }),
});
