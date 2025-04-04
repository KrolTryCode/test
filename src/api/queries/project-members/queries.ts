import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const projectMemberQueries = createQueryKeys('projectMembers', {
  list: (projectId: string) => ({
    queryKey: [projectId],
    queryFn: () => ApiClientSecured.projectNodeMemberV1Controller.getAllMembers(projectId),
  }),
});
