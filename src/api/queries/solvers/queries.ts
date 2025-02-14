import { createQueryKeys } from '@lukemorales/query-key-factory';

import { ApiClientSecured } from '~/api/utils/api-client';

export const solverQueries = createQueryKeys('solver', {
  list: (projectId: string) => ({
    queryKey: [projectId],
    queryFn: () => ApiClientSecured.projectSolversV1Controller.getProjectSolvers(projectId),
  }),
  file: (solverId: string) => ({
    queryKey: [solverId],
    queryFn: () => ApiClientSecured.solverFilesV1Controller.getSolverFile(solverId),
  }),
});
