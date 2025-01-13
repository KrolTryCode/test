import { createQueryKeys } from '@lukemorales/query-key-factory';

import { FORM_PARAMETERS_MOCK_SERVER_URLS } from '~/api/mocks/forms/parameters/controller';
import { FormParameter } from '~/api/mocks/forms/parameters/types';
import { ApiClientSecured } from '~/api/utils/api-client';

export const formParametersQueries = createQueryKeys('parameters', {
  list: (_formId: string) => ({
    queryKey: ['list'],
    queryFn: () =>
      ApiClientSecured.request<FormParameter[]>({
        path: `${FORM_PARAMETERS_MOCK_SERVER_URLS.GET_LIST}`,
        secure: true,
        method: 'GET',
      }),
  }),
});
