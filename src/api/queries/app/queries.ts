import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const appQueries = createQueryKeys('app', {
  configuration: {
    queryKey: null,
    queryFn: () => ApiClientSecured.applicationController.getAppConfig(),
  },
});
