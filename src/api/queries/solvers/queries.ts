import { createQueryKeys } from '@lukemorales/query-key-factory';

import { SOLVER_MOCK_SERVER_URLS } from '~/api/mocks/solvers/controller';
import { Solver } from '~/api/mocks/solvers/types';
import { ApiClientSecured } from '~/api/utils/api-client';

export const solverQueries = createQueryKeys('solver', {
  list: (_projectId: string) => ({
    queryKey: ['list'],
    queryFn: () =>
      ApiClientSecured.request<Solver[]>({
        path: `${SOLVER_MOCK_SERVER_URLS.GET_LIST}`,
        secure: true,
        method: 'GET',
      }),
  }),
});
