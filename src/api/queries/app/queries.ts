import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const appQueries = createQueryKeys('app', {
  configuration: () => ({
    queryKey: ['configuration'],
    queryFn: () => ApiClientSecured.applicationController.getAppConfig(),
  }),
});
