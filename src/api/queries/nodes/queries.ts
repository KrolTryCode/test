import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const nodeQueries = createQueryKeys('nodes', {
  tree: (projectId: string) => ({
    queryKey: [projectId, 'tree'],
    queryFn: () => ApiClientSecured.contentNodeV1Controller.getNodesTreeByProject({ projectId }),
  }),
});
