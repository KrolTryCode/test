import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const projectContentQueries = createQueryKeys('projectContent', {
  single: (nodeId: string) => ({
    queryKey: [nodeId],
    queryFn: () => ApiClientSecured.projectContentV1Controller.getNode(nodeId),
  }),
  contentNodesByParent: (projectId: string, parentNodeId?: string) => ({
    queryKey: [projectId, parentNodeId],
    queryFn: () =>
      ApiClientSecured.projectContentV1Controller.getChildrenContentNodesByParent(projectId, {
        parentNodeId,
      }),
  }),
});
