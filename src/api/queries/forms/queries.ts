import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const formsQueries = createQueryKeys('form', {
  list: (projectId: string) => ({
    queryKey: [projectId],
    queryFn: () =>
      ApiClientSecured.projectParameterFormV1Controller.getProjectParameterForms(projectId),
  }),
  single: (formId: string) => ({
    queryKey: [formId],
    queryFn: () => ApiClientSecured.parameterFormV1Controller.getParameterForm(formId),
  }),
});
