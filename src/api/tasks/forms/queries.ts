import { createQueryKeys } from '@lukemorales/query-key-factory';

import { FORMS_MOCK_SERVER_URLS } from '~/api/mocks/forms/controller';
import { TaskFormData } from '~/api/mocks/forms/types';
import { ApiClientSecured } from '~/api/utils/api-client';

export const formQueries = createQueryKeys('form', {
  list: (_projectId: string) => ({
    queryKey: ['list'],
    queryFn: () =>
      ApiClientSecured.request<TaskFormData[]>({
        path: `${FORMS_MOCK_SERVER_URLS.GET_LIST}`,
        secure: true,
        method: 'GET',
      }),
  }),
  single: (formId: string) => ({
    queryKey: [formId],
    queryFn: () =>
      ApiClientSecured.request<TaskFormData>({
        path: `${FORMS_MOCK_SERVER_URLS.GET}/${formId}`,
        secure: true,
        method: 'GET',
      }),
  }),
});
