import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const tokenQueries = createQueryKeys('token', {
  tokensList: (nodeId: string) => ({
    queryKey: [nodeId],
    queryFn: () => ApiClientSecured.projectNodeTokenV1Controller.getTokensForNode(nodeId),
  }),
});
