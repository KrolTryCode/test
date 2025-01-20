import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const projectContentQueries = createQueryKeys('project-content', {
  single: (nodeId: string) => ({
    queryKey: [nodeId],
    queryFn: () => ApiClientSecured.projectContentV1Controller.getNode(nodeId),
  }),
});
