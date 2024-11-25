import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const projectQueries = createQueryKeys('project', {
  single: (projectId: string) => ({
    queryKey: [projectId],
    queryFn: () => ApiClientSecured.projectNodeV1Controller.getProjectNodeById(projectId),
  }),
  byParent: (parentNodeId?: string) => ({
    queryKey: ['by-parent', parentNodeId],
    queryFn: () => ApiClientSecured.projectNodeV1Controller.getChildrenByParent({ parentNodeId }),
  }),
  tree: () => ({
    queryKey: ['tree'],
    queryFn: () => ApiClientSecured.projectNodeV1Controller.getNodesTree(),
  }),
  parents: (projectId: string) => ({
    queryKey: [projectId, 'parents'],
    queryFn: () =>
      ApiClientSecured.projectNodeV1Controller.getParentsByChild({ childNodeId: projectId }),
  }),
});
