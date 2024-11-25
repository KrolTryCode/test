import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const nodeQueries = createQueryKeys('nodes', {
  single: (nodeId: string) => ({
    queryKey: [nodeId],
    queryFn: () => ApiClientSecured.contentNodeV1Controller.getContentNodeById(nodeId),
  }),
  list: (projectId: string, parentNodeId?: string) => ({
    queryKey: [projectId, parentNodeId],
    queryFn: () =>
      ApiClientSecured.contentNodeV1Controller.getContentNodesByProject({
        projectId,
        parentNodeId,
      }),
  }),
  tree: (projectId: string) => ({
    queryKey: [projectId, 'tree'],
    queryFn: () => ApiClientSecured.contentNodeV1Controller.getNodesTreeByProject({ projectId }),
  }),
});
